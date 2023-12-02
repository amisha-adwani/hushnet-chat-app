import { React, useState} from "react";
import ChatContext from "./ChatContext";
import io from "socket.io-client";
const ChatState = (props) => {
    const [message, setMessage] = useState('');
    const [messageReceived, setMessageReceived] = useState('');
    const socket = io("http://localhost:3001");

    return (
      <ChatContext.Provider value={{ setMessage, message, messageReceived, setMessageReceived,socket }}>
        {props.children}
      </ChatContext.Provider>
    );
  };
  
  export default ChatState ;