import {React,useContext,useEffect} from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button, Icon } from "@mui/material";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import ChatContext from "../context/ChatContext";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
const Header = ({headerName}) => {
  const params = useParams();
  const context = useContext(ChatContext);
  const { socket } = context;
  const navigate = useNavigate();
  // const [mobileOpen, setMobileOpen] = React.useState(false);

  // const handleDrawerToggle = () => {
  //   setMobileOpen(!mobileOpen);
  // };


  const senderId = socket.id
const { roomId } = useParams();
const handleClick = () => {
  socket.emit("leave-room", { roomId, senderId }, () => {
    console.log("user left");
  });
navigate('/room/');
};

  
  return (
    <div>
      <AppBar
        color="inherit"
        position="fixed"
      >
        <Toolbar>
          <Typography sx={{ fontSize: "15px", overflowWrap: "break-word" }}>
          {headerName}
          </Typography>
          <Button  variant="contained"
          sx={{ textTransform: "none", m: 1 }} onClick={handleClick}>
            Leave chat
          </Button>
        </Toolbar>
        <Divider />
      </AppBar>
    </div>
  );
};

export default Header;
