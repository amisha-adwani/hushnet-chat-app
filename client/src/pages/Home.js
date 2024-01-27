import React, { useContext } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import { Typography } from "@mui/material";
import ChatContext from "../context/ChatContext";
import { useNavigate } from "react-router-dom";

const Home = ({onChangeHeader}) => {
  const context = useContext(ChatContext);
  const { socket,setUsername,username } = context;
  const navigate = useNavigate();
  const handleClick = () => {
    socket.emit("user-joined", {username, senderId: socket.id});
    navigate('/room/');
  };
 onChangeHeader('hushnet')
  const handleChange = (e) => {
    e.preventDefault();
    setUsername(e.target.value);
  };
  const card = (
    <React.Fragment>
      <CardContent>
        <Typography variant="h6" component="div">
          Enter a username to begin
        </Typography>
        <TextField
          id="outlined-basic"
          label="Username"
          variant="outlined"
          sx={{ fontSize: 14, mt: 1 }}
          onChange={handleChange}
          value={username}
        />
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          size="small"
          sx={{ ml: 1 }}
          onClick={handleClick}
        >
          Save
        </Button>
      </CardActions>
    </React.Fragment>
  );

  return (
    <Box sx={{ maxWidth: 345, margin: "0 auto", mt: { xs: 5, sm: 10 } }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
};
export default Home;
