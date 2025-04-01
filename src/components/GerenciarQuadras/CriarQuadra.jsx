import { useState } from "react";
import axios from "axios";
import Loading from "../Loading/Loading";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";

function CriarQuadra({ onAddQuadra, onClose, errorMessage }) {
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const token = localStorage.getItem("token");
  const sportsComplexId = localStorage.getItem("sportsComplexId");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const novaQuadra = {
      name,
      sportsComplexId,
    };

    try {
      setIsLoading(true);
      console.log(novaQuadra);
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}court/add`,
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
    <Dialog open onClose={onClose} fullWidth maxWidth="sm" >
      <DialogTitle>Adicionar Quadra</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <TextField
            label="Nome da quadra"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
             margin="dense"
          />
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" variant="outlined" sx={{color: "red", borderColor: "red"}} >
          Cancelar
        </Button>
        <Button type="submit" onClick={handleSubmit} color="primary" variant="contained" disabled={isLoading}>
          {isLoading ? <CircularProgress size={24} /> : "Adicionar"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CriarQuadra;