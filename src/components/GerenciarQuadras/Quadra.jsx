import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";

function Quadra({ quadra }) {
  const { id, nome } = quadra;
  const navigate = useNavigate();

  const gerenciarQuadra = () => {
    localStorage.setItem("idQuadra", id);
    localStorage.setItem("nomeQuadra", nome);
    navigate(`/gerenciar-horarios`);
  };

  return (
    <div className="quadra">
      {console.log(id, nome)}
      <MenuIcon className="btn-configure" onClick={gerenciarQuadra} />
      <h3>{nome}</h3>
    </div>
  );
}

export default Quadra;
