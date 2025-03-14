import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SportsIcon from "@mui/icons-material/Sports";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import ContentPasteIcon from '@mui/icons-material/ContentPaste';
import LogoutIcon from "@mui/icons-material/Logout";

const MenuLateral = () => {
  const navigate = useNavigate();

  const handleVoltar = () => {
    navigate(-1);
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="menu-lateral">
      <div className="seta-voltar" onClick={handleVoltar}>
        <ArrowBackIcon />
      </div>
      <ul>
        <li onClick={() => navigate("/gerenciar-quadras")}>
          <SportsIcon />
          Gerenciar Quadras
        </li>
        <li onClick={() => navigate("/gerenciar-solicitacoes")}>
          <ContentPasteIcon />
          Gerenciar Solicitações
        </li>
        <li onClick={() => navigate("/listar-agendamentos")}>
          <PlaylistAddCheckIcon />
          Listar Agendamentos
        </li>
      </ul>
      <div className="btn-logout" onClick={() => logout()}>
        <LogoutIcon />
        <p>Sair</p>
      </div>
    </div>
  );
};

export default MenuLateral;
