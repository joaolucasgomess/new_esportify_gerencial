import { useState } from "react";
import axios from "axios";
import Loading from "../Loading/Loading";

function CriarQuadra({ onAddQuadra, onClose, errorMessage }) {
  const [nome, setNome] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token");
  const id_complexo_esportivo = localStorage.getItem("idSportsComplex");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const novaQuadra = {
      nome,
      id_complexo_esportivo,
    };

    try {
      setIsLoading(true);
      console.log(novaQuadra);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}quadra/adicionar-quadra`,
        novaQuadra,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response.data);
      onAddQuadra(response.data);
      onClose();
    } catch (error) {
      if (
        error.response &&
        (error.response.data.error === "Token expired" ||
          error.response.data.error === "jwt malformed")
      ) {
        localStorage.removeItem("token");
      }
      console.error("Erro ao adicionar quadra:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Adicionar Quadra</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group-modal">
            <label>Nome da quadra:</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>
          <div className="btn-container-modal">
            <button type="submit" className="btn-modal">
              Adicionar
            </button>
            <button type="button" className="btn-modal" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
        {isLoading && <Loading isLoading={isLoading} />}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
    </div>
  );
}

export default CriarQuadra;
