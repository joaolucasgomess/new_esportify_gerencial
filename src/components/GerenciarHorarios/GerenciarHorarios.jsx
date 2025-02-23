import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AdicionarHorarioModal from "./AdicionarHorarioModal";
import ConfirmarExclusaoModal from "./ConfirmarExclusaoModal";
import DesativarHorarioModal from "./DesativarHorarioModal";
import AlterarHorarioModal from "./AlterarHorarioModal";
import Loading from "../Loading/Loading";
import MenuLateral from "../MenuLateral/MenuLateral";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import PowerSettingsNewIcon from "@mui/icons-material/PowerSettingsNew";
import AlarmIcon from "@mui/icons-material/Alarm";

function GerenciarHorarios() {
  const navigate = useNavigate();
  const [horarios, setHorarios] = useState([]);
  const [diasSemana, setDiasSemana] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isDesativarModalOpen, setIsDesativarModalOpen] = useState(false);
  const [isAlterarModalOpen, setIsAlterarModalOpen] = useState(false);
  const [horarioParaExcluir, setHorarioParaExcluir] = useState(null);
  const [horarioParaAlterar, setHorarioParaAlterar] = useState(null);
  const [diaSelecionado, setDiaSelecionado] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(6);
  const idQuadra = localStorage.getItem("idQuadra");
  const nomeQuadra = localStorage.getItem("nomeQuadra");
  const token = localStorage.getItem("token");

  useEffect(() => {
    // if (!token || !idQuadra) {
    //   navigate("/");
    //   return;
    // }

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [diasResponse, horariosResponse] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}dias_semana/`, {
            headers: { Authorization: token },
          }),
          axios.get(`${import.meta.env.VITE_API_URL}quadra/horarios/${idQuadra}`, {
            headers: { Authorization: token },
          }),
        ]);
        setDiasSemana(diasResponse.data.dias_da_semana);
        console.log(horariosResponse);
        setHorarios(horariosResponse.data.times);
      } catch (error) {
        if (
          error.response &&
          (error.response.data.error === "Token expired" ||
            error.response.data.error === "jwt malformed")
        ) {
          localStorage.removeItem("token");
        }
        console.error("Erro ao buscar dados:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [idQuadra, token, navigate]);

  const toggleModal = (dia) => {
    setErrorMessage("");
    setCurrentPage(1);
    setDiaSelecionado(dia);
    setIsModalOpen(!isModalOpen);
  };

  const toggleDeleteModal = (horario) => {
    setHorarioParaExcluir(horario);
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  const toggleDesativarModal = (horario) => {
    setHorarioParaExcluir(horario);
    setIsDesativarModalOpen(!isDesativarModalOpen);
  };

  const toggleAlterarModal = (horario) => {
    setHorarioParaAlterar(horario);
    setIsAlterarModalOpen(!isAlterarModalOpen);
  };

  const adicionarHorario = async (horario) => {
    try {
      setIsLoading(true);

      await axios.post(
        `${import.meta.env.VITE_API_URL}quadra/adicionar-horario`,
        {
          id_quadra: idQuadra,
          id_dia_semana: diaSelecionado.id,
          horario_inicial: horario.horario_inicial,
          horario_final: horario.horario_final,
          preco: horario.preco,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}quadra/horarios/${idQuadra}`,
        { headers: { Authorization: token } }
      );
      setHorarios(response.data.times);
      setIsModalOpen(false);
    } catch (error) {
      if (
        error.response &&
        (error.response.data.error === "Token expired" ||
          error.response.data.error === "jwt malformed")
      ) {
        localStorage.removeItem("token");
      }

      if (
        error.response &&
        error.response.data.error.includes("horário iniciando")
      ) {
        setErrorMessage(
          `Já existe outro horário iniciando às ${horario.horario_inicial}`
        );
      } else {
        setErrorMessage("Erro ao adicionar horário");
      }

      console.error("Erro ao adicionar horário:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const excluirHorario = async () => {
    try {
      setIsLoading(true);
      await axios.delete(
        `${import.meta.env.VITE_API_URL}quadra/deletar-horario/${horarioParaExcluir.id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}quadra/horarios/${idQuadra}`,
        { headers: { Authorization: token } }
      );
      setHorarios(response.data.times);
      console.log(response.data);
      toggleDeleteModal(null);
    } catch (error) {
      if (
        error.response &&
        (error.response.data.error === "Token expired" ||
          error.response.data.error === "jwt malformed")
      ) {
        localStorage.removeItem("token");
      }
      console.error("Erro ao excluir horário:", error);
    } finally {
      setIsLoading(false);
      toggleDeleteModal(null);
    }
  };

  const desativarHorario = async (horario) => {
    try {
      setIsLoading(true);
      // Lógica para desativar horário
    } catch (error) {
      console.error("Erro ao desativar horário:", error);
    } finally {
      setIsLoading(false);
      toggleDesativarModal(null);
    }
  };

  const alterarHorario = async (horario, novosDados) => {
    try {
      setIsLoading(true);
      // Lógica para alterar horário
    } catch (error) {
      console.error("Erro ao alterar horário:", error);
    } finally {
      setIsLoading(false);
      toggleAlterarModal(null);
    }
  };

  const renderizarHorarios = () => {
    if (isLoading) {
      return <Loading isLoading={isLoading} />;
    }

    if (!diaSelecionado) {
      return null;
    }

    if (!horarios) {
      return <div className="sem-horarios">Erro ao carregar horários.</div>;
    }

    const horariosDoDia = horarios.filter(
      (horario) => horario.id_dia_semana === diaSelecionado.id
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = horariosDoDia.slice(indexOfFirstItem, indexOfLastItem);

    if (currentItems.length === 0) {
      return <p className="sem-horarios">Sem horários definidos.</p>;
    }

    return (
      <>
        <div className="horarios-list">
          {currentItems.map((horario) => (
            <div key={horario.id} className="horario-card">
              <div className="horario-info">
                <h3>Horário: </h3>
                <p>
                  {horario.horario_inicial.slice(11, 16)} -{" "}
                  {horario.horario_final.slice(11, 16)}
                </p>
                <h3>Preço: </h3>
                <p>R$ {horario.preco}</p>
              </div>
              <div className="horario-actions">
                <EditIcon
                  className="action-icon"
                  onClick={() => toggleAlterarModal(horario)}
                />
                <PowerSettingsNewIcon
                  className="action-icon"
                  onClick={() => toggleDesativarModal(horario)}
                />
                <DeleteIcon
                  className="action-icon"
                  onClick={() => toggleDeleteModal(horario)}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="pagination">
          <button onClick={prevPage} disabled={currentPage === 1}>
            Página anterior
          </button>
          <button
            onClick={nextPage}
            disabled={
              indexOfLastItem >= horariosDoDia.length ||
              currentItems.length === 0
            }
          >
            Próxima página
          </button>
        </div>
      </>
    );
  };

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div className="gerenciar-container">
      <MenuLateral />
      <div className="main-content">
        <div className="header">
          <h2 className="gerenciar-horario">
            <AlarmIcon style={{ padding: "5px" }} />
            Gerenciar Horário - {nomeQuadra}
          </h2>
          <div
            onClick={() => diaSelecionado && toggleModal(diaSelecionado)}
            className="btn-add-horario"
            disabled={!diaSelecionado}
          >
            + Adicionar Horário
          </div>
        </div>
        <div className="dias-semana">
          {diasSemana.map((dia, index) => (
            <span
              key={dia.id}
              className={
                diaSelecionado && diaSelecionado.id === dia.id ? "selected" : ""
              }
              onClick={() => {
                setErrorMessage("");
                setCurrentPage(1);
                setDiaSelecionado(dia);
              }}
            >
              {dia.desc_dia
                .replace("SEG", "Segunda-feira")
                .replace("TER", "Terça-feira")
                .replace("QUA", "Quarta-feira")
                .replace("QUI", "Quinta-feira")
                .replace("SEX", "Sexta-feira")
                .replace("SAB", "Sábado")
                .replace("DOM", "Domingo")}
              {index < diasSemana.length - 1}
            </span>
          ))}
        </div>
        {renderizarHorarios()}
        {isModalOpen && (
          <AdicionarHorarioModal
            onClose={() => toggleModal(null)}
            onAddHorario={adicionarHorario}
            dia={diaSelecionado}
            errorMessage={errorMessage}
          />
        )}
        {isDeleteModalOpen && (
          <ConfirmarExclusaoModal
            open={isDeleteModalOpen}
            onClose={() => toggleDeleteModal()}
            onConfirm={excluirHorario}
            horario={horarioParaExcluir}
          />
        )}
        {isDesativarModalOpen && (
          <DesativarHorarioModal
            onClose={() => toggleDesativarModal()}
            onDesativar={desativarHorario}
            horario={horarioParaExcluir}
          />
        )}
        {isAlterarModalOpen && (
          <AlterarHorarioModal
            onClose={() => toggleAlterarModal()}
            onAlterar={alterarHorario}
            horario={horarioParaAlterar}
          />
        )}
      </div>
    </div>
  );
}

export default GerenciarHorarios;
