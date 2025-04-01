import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import { Card, CardContent, Typography, IconButton } from "@mui/material";

function Quadra({ quadra }) {
  const { id, name } = quadra;
  const navigate = useNavigate();

  const gerenciarQuadra = () => {
    localStorage.setItem("idQuadra", id);
    localStorage.setItem("nomeQuadra", name);
    navigate(`/gerenciar-horarios`);
  };

  return (
    <Card sx={{ minWidth: 275, maxWidth: 400, m: 1, display: "flex", alignItems: "center", boxShadow: "rgba(0, 0, 0, 0.04) 0px 3px 5px"}}>
      <CardContent sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
        <Typography variant="h6">{name}</Typography>
        <IconButton onClick={gerenciarQuadra} color="primary">
          <MenuIcon />
        </IconButton>
      </CardContent>
    </Card>
  );
}

export default Quadra;
