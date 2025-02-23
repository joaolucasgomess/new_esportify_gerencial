import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";
import MenuLateral from "../MenuLateral/MenuLateral";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import { socket } from "../../services/socket";

function GerenciarSolicitacoes() {
  const navigate = useNavigate();
  const [solicitacoes, setSolicitacoes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState("solicitadas");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const token = localStorage.getItem("token");
  const [socketInstance] = useState(socket())

  useEffect(() => {
    socketInstance.on('rent', () => {
      console.log('teste')
    })

    return () => {
      socketInstance.off('rent')
    }
  }, [])

  useEffect(() => {
    /*if (!token) {
    navigate("/");
    }*/
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}solicitacoes`, {
          headers: { Authorization: token },
        });
        setSolicitacoes(response.data);
      } catch (error) {
        if (
          error.response &&
          (error.response.data.error === "Token expired" ||
            error.response.data.error === "jwt malformed")
        ) {
          localStorage.removeItem("token");
          navigate("/");
        }
        console.error("Erro ao buscar dados:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [token, navigate]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filter]);

  const filteredSolicitacoes = solicitacoes.filter(
    (solicitacao) => solicitacao.status === filter
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredSolicitacoes.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const aceitarSolicitacao = async (id) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}solicitar`,
        { status: "aceita" },
        { headers: { Authorization: token } }
      );
      const updatedSolicitacoes = solicitacoes.map((solicitacao) =>
        solicitacao.id === id
          ? { ...solicitacao, status: "aceita" }
          : solicitacao
      );
      setSolicitacoes(updatedSolicitacoes);
    } catch (error) {
      console.error("Erro ao aceitar solicitação:", error);
    }
  };

  const negarSolicitacao = async (id) => {
    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}solicitar`,
        { status: "negada" },
        { headers: { Authorization: token } }
      );
      const updatedSolicitacoes = solicitacoes.map((solicitacao) =>
        solicitacao.id === id
          ? { ...solicitacao, status: "negada" }
          : solicitacao
      );
      setSolicitacoes(updatedSolicitacoes);
    } catch (error) {
      console.error("Erro ao negar solicitação:", error);
    }
  };

  const renderizarSolicitacoes = () => {
    if (isLoading) {
      return <Loading isLoading={isLoading} />;
    }

    if (currentItems.length === 0) {
      return (
        <p className="sem-solicitacoes">Nenhuma solicitação encontrada.</p>
      );
    }

    return (
      <div className="solicitacoes-list">
        {currentItems.map((solicitacao) => (
          <div key={solicitacao.id} className="solicitacao-card">
            <div className="solicitacao-info">
              <h3>{solicitacao.nome}</h3>
              <p>Telefone: {solicitacao.telefone}</p>
              <p>Quadra solicitada: {solicitacao.quadra}</p>
              <p>Dia solicitado: {solicitacao.dia}</p>
              <p>
                Horário: {solicitacao.horario_inicial} -{" "}
                {solicitacao.horario_final}
              </p>
            </div>
            <div className="solicitacao-actions">
              {filter === "solicitadas" && (
                <>
                  <button
                    className="negar"
                    onClick={() => negarSolicitacao(solicitacao.id)}
                  >
                    <CancelIcon />
                  </button>
                  <button
                    className="aceitar"
                    onClick={() => aceitarSolicitacao(solicitacao.id)}
                  >
                    <CheckCircleIcon />
                  </button>
                </>
              )}
            </div>
          </div>
        ))}
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
    <div className="gerenciar-container-solicitacoes">
      <MenuLateral />
      <div className="main-content-solicitacoes">
        <div className="header-solicitacoes">
          <div className="options-solicitacoes">
            <span
              className={filter === "solicitadas" ? "selected" : ""}
              onClick={() => handleFilterChange("solicitadas")}
            >
              <HourglassEmptyIcon /> Solicitadas
            </span>
            <span
              className={filter === "aceitas" ? "selected" : ""}
              onClick={() => handleFilterChange("aceitas")}
            >
              <CheckCircleIcon /> Aceitas
            </span>
            <span
              className={filter === "negadas" ? "selected" : ""}
              onClick={() => handleFilterChange("negadas")}
            >
              <CancelIcon /> Negadas
            </span>
          </div>
        </div>
        <div className="solicitacoes-container">{renderizarSolicitacoes()}</div>
        <div className="pagination">
          <button onClick={prevPage} disabled={currentPage === 1}>
            Página anterior
          </button>
          <button
            onClick={nextPage}
            disabled={
              indexOfLastItem >= filteredSolicitacoes.length ||
              currentItems.length === 0
            }
          >
            Próxima página
          </button>
        </div>
      </div>
    </div>
  );
}

export default GerenciarSolicitacoes;
