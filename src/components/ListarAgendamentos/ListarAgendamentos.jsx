import { useEffect, useState } from "react";
import MenuLateral from "../MenuLateral/MenuLateral";
import axios from "axios";
import Loading from "../Loading/Loading";

function ListarAgendamentos() {
  const [horarios, setHorarios] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(4);
  const token = localStorage.getItem("token");

  /*if (!token) {
    navigate("/");
  }*/

  useEffect(() => {
    const fetchHorarios = async () => {
      try {
        const token = localStorage.getItem("token");  
        const quadra = localStorage.getItem("idQuadra");
        const response = await axios.get(`${import.meta.env.VITE_API_URL}quadra/alugueis/${quadra}`, {
          headers: {
            Authorization: token
          }
        });

        if (response.data && response.data.rentTimes) {
          setHorarios(response.data.rentTimes);
        } else {
          setHorarios([]);
        }
        console.log(response.data);
      } catch (error) {
        if (
          error.response &&
          (error.response.data.error === "Token expired" ||
            error.response.data.error === "jwt malformed")
        ) {
          localStorage.removeItem("token");
        }
        console.error("Erro ao buscar horários:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHorarios();

    const intervalId = setInterval(fetchHorarios, 10000);
    return () => clearInterval(intervalId);
  }, [token]);

  const formatarData = (data) => {
    const dataObj = new Date(data);
    const dia = String(dataObj.getDate()).padStart(2, '0');
    const mes = String(dataObj.getMonth() + 1).padStart(2, '0');
    const ano = dataObj.getFullYear();
    return `${dia}/${mes}/${ano}`;
  };

  const renderizarHorarios = () => {
    if (isLoading) {
      return <Loading isLoading={isLoading} />;
    }

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentHorarios = horarios.slice(indexOfFirstItem, indexOfLastItem);

    if (currentHorarios.length === 0) {
      return (
        <p className="sem-solicitacoes">Não há horários agendados.</p>
      );
    }

    return (
      <div>
        <ul className="horarios-lista">
          {currentHorarios.map((horario) => (
            <li key={horario.id} className="horario-item">
              <p>Cliente: {horario.usuario.nome}</p>
              <p>Dia: {formatarData(horario.data)}</p>
              <p>
                Horário: De {horario.horario_aluguel.horario_inicial} às {horario.horario_aluguel.horario_final}
              </p>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className="listar-agendamentos">
      <MenuLateral />
      {renderizarHorarios()}
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>
          Página anterior
        </button>
        <button onClick={nextPage} disabled={currentPage * itemsPerPage >= horarios.length}>
          Próxima página
        </button>
      </div>
    </div>
  );
}

 export default ListarAgendamentos;