import {React,useContext,useEffect} from "react";
import AppBar from "@mui/material/AppBar";
import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const Header = ({headerName}) => {
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
        </Toolbar>
        <Divider />
      </AppBar>
    </div>
  );
};

export default Header;
