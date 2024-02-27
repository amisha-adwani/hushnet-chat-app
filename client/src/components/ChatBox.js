import React, { useContext, useEffect } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import ChatContext from "../context/ChatContext";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SendIcon from '@mui/icons-material/Send';
import Details from "./Avatar";
const ChatBox = ({ userNotification }) => {
  const context = useContext(ChatContext);
  const {
    message,
    setMessage,
    setMessageReceived,
    messageReceived,
    socket,
    username,
  } = context;
  const { roomId } = useParams();
  useEffect(() => {
    setMessageReceived([])
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
    navigate("/room");
  };
  const onDelete = () => {
    socket.emit("remove-room", { roomId, senderId });
    navigate("/room");
  };

  return (
    <div>
      <Box height={530} overflow="auto">
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

        <Typography component="div" ml={2}>
          {messageReceived.map((msg, index) => (
            <Box
            key={index}
              component="section"
              sx={{
                // p: 2,
                mr: 2,
                mt: 1,
                display:'flex',
                maxWidth: "30%",
                ...(msg.senderId === socket.id && { pl: 162 }),
                wordWrap: "break-word",
              }}
            >
              <Box sx={{...(msg.senderId === socket.id && { display: 'none' })}}>
            <Details name={msg.username}/> 
              </Box>
            <Box sx={ {bgcolor:'primary.main',p: 2,color:'primary.contrastText', borderRadius:3,width:150}}>
            {`${msg.username}: ${msg.message}`}
              </Box> 
            </Box>
          ))}
        </Typography>
      </Box>
      <Box
        display={"flex"}
        alignItems="center"
         mx={5}
        mt={2}
        mb={8}
        sx={{  border:'1px solid lightblue',boxShadow:"4px 4px 4px  lightgray"}}
      
      >
        <TextField
        fullWidth
          sx={{
            "& fieldset": { border: 'none' }
          }}
          onChange={handleChange}
          value={message}
          placeholder="Enter message"
        ></TextField>
        <Button
          onClick={handleClick}
          size="large"
          sx={{ border:'none' }}
          endIcon={<SendIcon />}
        >
        </Button>
        </Box>
    </div>
  );
};

export default ChatBox;
