import React, { useContext, useEffect, useCallback } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ChatContext from "../context/ChatContext";
import { useParams } from "react-router-dom";
import { Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
const ChatBox = ({ userNotification }) => {
  const context = useContext(ChatContext);
  const { message, setMessage, setMessageReceived, messageReceived, socket } =
    context;
  const { roomId } = useParams();
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived((prevMessages) => [
        ...prevMessages,
        { message: data.message, senderId: data.senderId },
      ]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, [socket, setMessageReceived]);

  const handleClick = () => {
    socket.emit("send_message", { message, roomId, senderId: socket.id });
    setMessage("");
  };

  const handleChange = (e) => {
    setMessage(e.target.value);
  };
  const navigate = useNavigate();
  const senderId = socket.id;
  const onHandleClick = () => {
    socket.emit("leave-room", { roomId, senderId });
    navigate("/room/");
  };
  const onDelete =()=>{
  socket.emit('remove-room',{roomId})
  }
  return (
    <div>
      <Box height={490} overflow="auto">
        <Button
          variant="contained"
          sx={{ textTransform: "none", mt: 9 }}
          onClick={onHandleClick}
        >
          Leave chat
        </Button>
        <Button
          variant="contained"
          sx={{ textTransform: "none", mt: 9 }}
          onClick={onDelete}
        >
          Delete room
        </Button>
        <Typography component="div"  ml={2}>
          {userNotification.map((message, index) => (
            <div key={index}>{message}</div>
          ))}
        </Typography>
        <Typography component="div" ml={2}>
          {messageReceived.map((msg, index) => (
            <div key={index}> {`${msg.senderId}: ${msg.message}`}</div>
          ))}
        </Typography>
      </Box>
      <Box
        display={{ base: "flex", md: "flex" }}
        alignItems="center"
        ml={5}
        mr={5}
        mt={2}
        w={{ base: "100%", md: "68%" }}
      >
        <TextField
          fullWidth
          id="fullWidth"
          onChange={handleChange}
          value={message}
        ></TextField>
        <Button
          variant="contained"
          onClick={handleClick}
          sx={{ textTransform: "none", m: 1 }}
        >
          Send
        </Button>
      </Box>
    </div>
  );
};

export default ChatBox;
