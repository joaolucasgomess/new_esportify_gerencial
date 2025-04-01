import MenuLateral from "../MenuLateral/MenuLateral";
import { Box } from "@mui/material";

const Layout = ({ children }) => {
  return (
    <Box display="flex">
      <MenuLateral />
      <Box component="main" sx={{ flexGrow: 1, padding: 1 }}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
