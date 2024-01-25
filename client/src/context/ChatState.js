import { React, useState } from "react";
import ChatContext from "./ChatContext";
import io from "socket.io-client";
const URL = "http://localhost:3001";
const socket = io(URL);
const ChatState = (props) => {
  const [message, setMessage] = useState([]);
  const [messageReceived, setMessageReceived] = useState([]);
  const [username, setUsername] = useState('');
  return (
    <ChatContext.Provider
      value={{
        setMessage,
        message,
        messageReceived,
        setMessageReceived,
        socket,
        username,
        setUsername
      }}
    >
      {props.children}
    </ChatContext.Provider>
  );
};

export default ChatState;
