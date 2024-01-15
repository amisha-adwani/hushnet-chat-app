import React, { useContext, useEffect, useCallback } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import ChatContext from "../context/ChatContext";
import { useParams } from "react-router-dom";
import { Paper , Typography } from "@mui/material";

const ChatBox = () => {
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

  return (
    <div>
      <Box  height={490} overflow="auto">
      <Typography mt={9} ml={2}>
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
            
          >
            
          </TextField>
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
