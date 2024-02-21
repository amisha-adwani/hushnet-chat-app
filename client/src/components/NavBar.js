import * as React from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AllInboxIcon from "@mui/icons-material/AllInbox";
import HomeIcon from "@mui/icons-material/Home";
import { Link, useLocation } from "react-router-dom";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";

export default function NavBar() {
  const location = useLocation();
  const [value, setValue] = React.useState(location.pathname);

  React.useEffect(() => {
    setValue(location.pathname);
  }, [location]);

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
        value="/"
        icon={<HomeIcon />}
      />

      <BottomNavigationAction
        component={Link}
        to="/room"
        label="Inbox"
        value="/room"
        icon={<AllInboxIcon />}
      />
      <BottomNavigationAction
        component={Link}
        to="/profile"
        label="Profile"
        value="/profile"
        icon={<AccountCircleIcon />}
      />
    </BottomNavigation>
  );
}
