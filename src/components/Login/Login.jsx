import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import RightImage from "../../assets/images/imagemGerencial.png";
import LeftImage from "../../assets/images/esportifyGerencial.png";
import Loading from "../Loading/Loading";

function Home() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}administrador/login`, {
        email,
        senha,
      });

      const token = response.data.token;
      const decodedToken = jwtDecode(token);
      const idSportsComplex = decodedToken.idSportsComplex;

      localStorage.setItem("idSportsComplex", idSportsComplex);
      localStorage.setItem("token", token);
      navigate("/gerenciar-quadras");
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage("Credenciais inválidas.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container-login">
      <div className="left-panel">
        <img
          src={LeftImage}
          className="img-esportify"
          alt="Esportify - Gerencial"
        ></img>
        <div className="text-welcome">
          <strong>Bem-vindo</strong> ao seu hub de controle e crescimento.
        </div>
        <div className="login-form-container">
          <form onSubmit={handleLoginSubmit}>
            <input
              className="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="senha"
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
            <button type="submit" className="btn-login">
              Entrar
            </button>

            {errorMessage && <p className="error-message">{errorMessage}</p>}

            <div className="texto">
              <p>Não tem uma conta? </p>
              <p
                className="cadastro-decoration"
                onClick={() => navigate("/register")}
              >
                Cadastre-se
              </p>
            </div>
          </form>
        </div>
      </div>
      <div className="right-panel">
        <img
          src={RightImage}
          alt="Imagem de início"
          className="img-panel"
        />
      </div>

      {isLoading && <Loading isLoading={isLoading} />}
    </div>
  );
}

export default Home;
