import { Modal, Box, Typography, Button, Divider, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const LogoutModal = ({ open, onClose, onConfirm }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 350,
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2, bgcolor: "#f5f5f5" }}>
          <Typography variant="h6" fontWeight="bold">Confirmar Logout</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider />

        {/* Content */}
        <Box sx={{ p: 3, textAlign: "center" }}>
          <Typography variant="body1">
            Tem certeza que deseja sair? Você precisará fazer login novamente para acessar sua conta.
          </Typography>
        </Box>

        <Divider />

        {/* Footer */}
        <Box sx={{ display: "flex", justifyContent: "space-between", gap: 2, p: 2 }}>
          <Button variant="outlined" color="primary" onClick={onClose} fullWidth>
            Cancelar
          </Button>
          <Button variant="contained" color="error" onClick={onConfirm} fullWidth>
            Sair
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default LogoutModal;
