import React, { useContext} from "react";
import AppBar from "@mui/material/AppBar";
import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import { useLocation } from "react-router-dom";
import Details from "./Avatar";
import ChatContext from "../context/ChatContext";
import Typography from "@mui/material/Typography";

const Header = ({ headerName }) => {
  const location = useLocation();
  const chatIcon = /^\/room\/\w+/.test(location.pathname);
  const roomId = location.pathname.split("/").pop();
  const context = useContext(ChatContext);
  const { username } = context;

  return (
    <div>
      <AppBar color="inherit" position="fixed">
        <Toolbar>
          <Details name={chatIcon ? roomId : username} />
          <Typography
            sx={{
              fontSize: "15px",
              whiteSpace: "normal",
             maxWidth: '100%',
           overflowWrap: 'break-word'
            }}
          >
            {headerName}
          </Typography>
        </Toolbar>
        <Divider />
      
        </AppBar>
    </div>
  );
};

export default Header;
