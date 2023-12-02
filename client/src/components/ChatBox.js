import { React, useContext, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ChatContext from "../context/ChatContext";

const ChatBox = () => {
  const context = useContext(ChatContext);
  const { message, setMessage, setMessageReceived, messageReceived, socket } = context;
  const handleClick = () => {
    socket.emit("send_message", message);
  };
  const handleChange = (e) => {
    setMessage(e.target.value);
  };
  useEffect(() => {
    socket.on("receive_message", (msg) => {
      setMessageReceived(msg);
    });
  }, []);

  return (
    <div>
      <Box height={450}>{messageReceived}</Box>
      <Box
        display={{ base: "flex", md: "flex" }}
        alignItems="center"
        p={5}
        bg="white"
        w={{ base: "100%", md: "68%" }}
        borderRadius="lg"
      >
        <Grid container>
          <Grid item xs={11}>
            <TextField fullWidth id="fullWidth" onChange={handleChange} />
          </Grid>
          <Grid item xs>
            <Button variant="contained" onClick={handleClick}>
              Send
            </Button>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};
export default ChatBox;
