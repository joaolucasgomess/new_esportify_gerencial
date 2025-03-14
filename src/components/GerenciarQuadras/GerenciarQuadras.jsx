import { useState, useEffect } from "react";
import Quadra from "./Quadra";
import CriarQuadra from "./CriarQuadra";
import Loading from "../Loading/Loading";
import MenuLateral from "../MenuLateral/MenuLateral";
import axios from "axios";

function GerenciarQuadras() {
  const [isLoading, setIsLoading] = useState(true);
  const [quadras, setQuadras] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    /*if (!token) {
    navigate("/");
    }*/
    const fetchQuadras = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}quadra`, {
          headers: {
            Authorization: token,
          },
        });
        setQuadras(response.data.courts);
      } catch (error) {
        if (
          error.response &&
          (error.response.data.error === "Token expired" ||
            error.response.data.error === "jwt malformed")
        ) {
          localStorage.removeItem("token");
        }
        console.error("Erro ao buscar quadras:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuadras();
  }, [token]);

  const adicionarQuadra = (novaQuadra) => {
    setQuadras([...quadras, novaQuadra]);
  };

  const renderizarQuadras = () => {
    if (isLoading) {
      return <Loading isLoading={isLoading} />;
    }

    if (quadras.length === 0) {
      return <p>Nenhuma quadra adicionada ainda.</p>;
    }

    return (
      <div className="quadras-list">
        {quadras.map((quadra) => (
          <Quadra key={quadra.id} quadra={quadra} />
        ))}
      </div>
    );
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <MenuLateral />
      <div>
        <div className="button-container">
          <p className="minhas-quadras">Minhas quadras:</p>
          <div onClick={openModal} className="btn-add-quadra">
            <p>+ Adicionar quadra</p>
          </div>
        </div>
        <div className="quadras-container">{renderizarQuadras()}</div>
      </div>
      {isModalOpen && (
        <CriarQuadra onAddQuadra={adicionarQuadra} onClose={closeModal} />
      )}
    </div>
  );
}

export default GerenciarQuadras;
