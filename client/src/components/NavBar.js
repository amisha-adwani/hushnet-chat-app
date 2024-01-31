import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";

import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import FolderIcon from "@mui/icons-material/Folder";
import RestoreIcon from "@mui/icons-material/Restore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import LocationOnIcon from "@mui/icons-material/LocationOn";

export default function NavBar() {

  const [value, setValue] = React.useState("home");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <BottomNavigation
      sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "space-around",
        bgcolor: "primary.main",
        "& .MuiBottomNavigationAction-root, .Mui-selected, svg": {
          color: "primary.contrastText",
        },
      }}
      value={value}
      onChange={handleChange}
    >
      <BottomNavigationAction
        component={Link}
        to="/"
        label="Home"
        value="home"
        icon={<HomeIcon />}
      />

      <BottomNavigationAction
        component={Link}
        to="/room"
        label="Inbox"
        value="inbox"
        icon={<AllInboxIcon />}
      />
      <BottomNavigationAction
        component={Link}
        to="/profile"
        label="Profile"
        value="profile"
        icon={<AccountCircleIcon />}
      />
    </BottomNavigation>
  );
}
