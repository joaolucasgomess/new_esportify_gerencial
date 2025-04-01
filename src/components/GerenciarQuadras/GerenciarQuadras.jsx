import { useState, useEffect } from "react";
import Quadra from "./Quadra";
import CriarQuadra from "./CriarQuadra";
import axios from "axios";
import { Box, Typography, Button, Modal, CircularProgress, Paper } from "@mui/material";
import Loading from "../Loading/Loading";

function GerenciarQuadras() {
  const [isLoading, setIsLoading] = useState(true);
  const [courts, setCourts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    courts
    const fetchQuadras = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}court`, {
          headers: {
            Authorization: token,
          },
        });
        
        setCourts(response.data.courts);
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
    setCourts([...courts, novaQuadra]);
  };

  const renderizarQuadras = () => {
    if (isLoading) {
      return <Loading isLoading={isLoading} />;
    }

    if (courts.length === 0) {
      return <Typography variant="body1">Nenhuma quadra adicionada ainda.</Typography>;
    }

    return (
      <Box display="flex" flexWrap="wrap" gap={2}>
        {courts.map((court) => (
          <Quadra key={court.id} quadra={court} />
        ))}
      </Box>
    );
  };

  return (
    <Box display="flex">
      <Box flexGrow={1} p={3}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h5">Minhas quadras:</Typography>
          <Button variant="contained" color="primary" onClick={() => setIsModalOpen(true)}>
            + Adicionar quadra
          </Button>
        </Box>
        <Paper elevation={3} sx={{ p: 2, boxShadow: "none", backgroundColor:"inherit" }}>{renderizarQuadras()}</Paper>
      </Box>
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          height="100vh"
        >
          <Box
            p={4}
            bgcolor="background.paper"
            boxShadow={3}
            borderRadius={2}
            width="90%"
            maxWidth="500px"
            overflow="auto"
          >
            <CriarQuadra onAddQuadra={adicionarQuadra} onClose={() => setIsModalOpen(false)} />
          </Box>
        </Box>
      </Modal>

    </Box>
  );
}

export default GerenciarQuadras;