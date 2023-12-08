import { React, useState } from "react";
import ChatContext from "./ChatContext";
import io from "socket.io-client";
const ChatState = (props) => {
  const [message, setMessage] = useState([]);
  const [messageReceived, setMessageReceived] = useState([]);
  const socket = io("http://localhost:3001");
  const roomId = (Math.random() * 10).toFixed(4);
  return (
    <ChatContext.Provider
      value={{
        setMessage,
        message,
        messageReceived,
        setMessageReceived,
        socket,
        roomId,
      }}
    >
      {props.children}
    </ChatContext.Provider>
  );
};

export default ChatState;
