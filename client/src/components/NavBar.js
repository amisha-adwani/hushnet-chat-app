import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <AppBar position="fixed" color="primary" sx={{ top: "auto", bottom: 0 }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <Link to="/">
          <IconButton color="secondary">
            <HomeIcon />
          </IconButton>
        </Link>
        <Link to="/room/">
          <IconButton color="secondary">
            <AllInboxIcon />
          </IconButton>
        </Link>
        <Link to="/profile">
          <IconButton color="secondary">
            <AccountCircleIcon />
          </IconButton>
        </Link>
      </Toolbar>
    </AppBar>
  );
}
