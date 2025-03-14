import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { Box, Typography, TextField, Button, Link } from "@mui/material";
import LeftImage from "../../assets/images/esportify-logo.png";
import RightImage from "../../assets/images/img-login.png";
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
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}administrador/login`,
        { email, senha }
      );

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
    <Box display="flex" minHeight="100vh">
      {/* Painel Esquerdo */}
      <Box
        flex={1}
        sx={{
          backgroundColor: "#f5f5f5",
          boxShadow: "2px 0px 8px rgba(0, 0, 0, 0.1)",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          p: 2,
          justifyContent: "center"
        }}
      >
        {/* Logo Centralizada no Topo */}
        <Box sx={{ display: "flex", justifyContent: "center", pt: "60px", position: "fixed", top: "0", alignSelf: "center" }}>
          <img
            src={LeftImage}
            alt="Esportify - Gerencial"
            style={{ maxWidth: "250px" }}
          />
        </Box>

        <Typography align="center">
          <strong>Bem-vindo</strong> ao seu Hub de Gerenciamento.
        </Typography>
        <Typography align="center">
          Gerencie sua quadra de um jeito simples e eficaz!
        </Typography>


        {/* Caixa de Login Centralizada */}
        <Box
          component="form"
          onSubmit={handleLoginSubmit}
          sx={{
            maxWidth: 400,
            width: "100%",
            mx: "auto",
            p: 3,
            borderRadius: 2,
            mt: 4,
          }}
        >
          <Typography variant="h6" align="center" gutterBottom sx={{
            fontWeight: "400"
          }}>
            Faça Login para continuar
          </Typography>
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px", // Definindo o arredondamento para a borda
              },
            }}
          />

          <TextField
            label="Senha"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "10px", // Definindo o arredondamento para a borda
              },
            }}
          />

          {errorMessage && (
            <Typography color="error" variant="body2" align="center">
              {errorMessage}
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{ mt: 2, backgroundColor: "primary" }}
          >
            Entrar
          </Button>
        </Box>

        {/* "Cadastre-se" Fixo na Parte Inferior */}
        <Box
          sx={{
            position: "relative",
            width: "100%%",
            textAlign: "center",
          }}
        >
          <Typography variant="body2">
            Não tem uma conta?{" "}
            <Link
              component="button"
              variant="body2"
              onClick={() => navigate("/register")}
              sx={{ textDecoration: "none" }}
            >
              Cadastre-se
            </Link>
          </Typography>
        </Box>
      </Box>

      <Box flex={2} display={{ xs: "none", md: "flex" }} sx={{ width: "100%", height: "100%" }}>
        <img
          src={RightImage}
          alt="Imagem de início"
          style={{
            width: "100%",
            height: "100vh",
            objectFit: "cover", // Faz a imagem ocupar 100% da largura e altura, mesmo que distorça
          }}
        />
      </Box>


      {isLoading && <Loading isLoading={isLoading} />}
    </Box>
  );
}

export default Home;
