import { useNavigate } from "react-router-dom";
import EsportifyGerencial from "../../assets/images/esportifyGerencial.png";

const Completion = () => {
  const navigate = useNavigate();

  return (
    <div className="register-form-container">
      <img
        src={EsportifyGerencial}
        alt="Esportify Gerencial"
        className="img-esportify"
      ></img>
      <h3>Boas vindas ao seu gerenciador de quadras!</h3>
      <button onClick={() => navigate("/")} className="btn-login">
        Página Inicial
      </button>
    </div>
  );
};

export default Completion;
