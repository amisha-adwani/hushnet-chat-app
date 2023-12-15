import { React, useState } from "react";
import ChatContext from "./ChatContext";
import io from "socket.io-client";
const socket = io("http://localhost:3001");
const ChatState = (props) => {
  const [message, setMessage] = useState([]);
  const [messageReceived, setMessageReceived] = useState([]);
  const [roomId] = useState((Math.random() * 10).toFixed(4));
  const [newRoomId, setNewRoomId] = useState(null);
  return (
    <ChatContext.Provider
      value={{
        setMessage,
        message,
        messageReceived,
        setMessageReceived,
        socket,
        roomId,
        setNewRoomId,
        newRoomId
      }}
    >
      {props.children}
    </ChatContext.Provider>
  );
};

export default ChatState;
