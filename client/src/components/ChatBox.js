import React, { useContext, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ChatContext from "../context/ChatContext";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
const ChatBox = ({ userNotification }) => {
  const context = useContext(ChatContext);
  const {
    message,
    setMessage,
    setMessageReceived,
    messageReceived,
    socket,
    setErrorMessage,
    errorMessage,
    username,
  } = context;
  const { roomId } = useParams();
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived((prevMessages) => [
        ...prevMessages,
        {
          message: data.message,
          senderId: data.senderId,
          username: data.username,
        },
      ]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, [socket, setMessageReceived]);

  const handleClick = () => {
    socket.emit("send_message", { message, roomId, senderId, username });
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
  const onDelete = () => {
    socket.emit("remove-room", { roomId, senderId });
    navigate("/room/");
  };
  const handleError = (error) => {
    setErrorMessage(error);
  };
  socket.on("error", handleError);
  return (
    <div>
      <Box height={490} overflow="auto">
        <Button
          variant="contained"
          sx={{ textTransform: "none", mt: 9, mr: 2, ml: 2, mb: 2 }}
          onClick={onHandleClick}
        >
          Leave chat
        </Button>
        <Button
          variant="contained"
          sx={{ textTransform: "none", mt: 9, mb: 2 }}
          onClick={onDelete}
        >
          Delete room
        </Button>
        {userNotification && (
          <Typography component="div" ml={2}>
            {userNotification.map((notification, index) => (
              <div key={index}>{notification}</div>
            ))}
          </Typography>
        )}
        {errorMessage && (
          <Typography component="div" ml={2}>
            Error: {errorMessage}
          </Typography>
        )}

        <Typography component="div" ml={2}>
          {messageReceived.map((msg, index) => (
            <Box
              component="section"
              sx={{
                p: 2,
                border: "1px dashed grey",
                mr: 2,
                mt: 1,
                maxWidth: "30%",
                ...(msg.senderId === socket.id && { ml: "auto" }),
                wordWrap: "break-word",
              }}
            >
              <div key={index}> {`${msg.username}: ${msg.message}`}</div>
            </Box>
          ))}
        </Typography>
      </Box>
      <Box
        display={"flex"}
        alignItems="center"
        ml={5}
        mr={5}
        mt={3}
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
