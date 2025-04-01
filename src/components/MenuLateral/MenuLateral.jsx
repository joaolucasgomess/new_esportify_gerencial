import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider, Box } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import PlaylistAddCheckIcon from "@mui/icons-material/PlaylistAddCheck";
import { GiSoccerField } from "react-icons/gi";
import LogoutModal from "../Modals/Logout/LogoutModal"; // Importando o modal
import ESPORTIFYLOGO from "../../assets/images/esportify-logo.png";

const MenuLateral = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Abre o modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  // Fecha o modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  // Confirmação do logout
  const confirmLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <>
      <Drawer
        variant="permanent"
        sx={{
          width: 240,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: 240, boxSizing: "border-box", display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 2 },
        }}
      >
        {/* Logo */}
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center", padding: 2 }}>
          <img src={ESPORTIFYLOGO} alt="Logo" style={{ maxWidth: "100%", height: "auto" }} />
        </Box>

        <Divider sx={{ width: "80%", marginBottom: 2 }} />

        {/* Menu */}
        <List sx={{ flexGrow: 1, width: "100%" }}>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/gerenciar-quadras")}>
              <ListItemIcon><GiSoccerField size={25} /></ListItemIcon>
              <ListItemText primary="Gerenciar Quadras" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/gerenciar-solicitacoes")}>
              <ListItemIcon><ContentPasteIcon /></ListItemIcon>
              <ListItemText primary="Gerenciar Solicitações" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate("/listar-agendamentos")}>
              <ListItemIcon><PlaylistAddCheckIcon /></ListItemIcon>
              <ListItemText primary="Listar Agendamentos" />
            </ListItemButton>
          </ListItem>
        </List>

        <Divider sx={{ width: "80%" }} />

        {/* Botão de Logout */}
        <ListItem disablePadding sx={{ marginBottom: 2, display: "flex", justifyContent: "center", width: "100%" }}>
          <ListItemButton
            onClick={handleOpenModal} // Abre o modal
            sx={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              color: "red",
              gap: 1,
            }}
          >
            <ListItemIcon sx={{ color: "red", minWidth: "auto" }}><LogoutIcon sx={{marginRight: "10px"}}/> Sair </ListItemIcon>
          </ListItemButton>
        </ListItem>
      </Drawer>

      {/* Modal de Logout */}
      <LogoutModal open={isModalOpen} onClose={handleCloseModal} onConfirm={confirmLogout} />
    </>
  );
};

export default MenuLateral;
