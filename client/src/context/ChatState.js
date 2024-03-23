import { React, useState } from "react";
import ChatContext from "./ChatContext";
import io from "socket.io-client";
//const URL = "https://hushnet.onrender.com";
const URL = "http://localhost:3001";
const socket = io(URL);
const ChatState = (props) => {
  const [message, setMessage] = useState([]);
  const [messageReceived, setMessageReceived] = useState([]);
  const [username, setUsername] = useState('Guest');
  const [errorMessage, setErrorMessage] = useState("");
  const [rooms, setRooms] = useState([]);
  const [senderId, setSenderId] = useState('')
  const [loading, setLoading] = useState(false); 
  const fetchRooms = async () => {
    try {
      setLoading(true); 
      // const fetchURL = "https://hushnet.onrender.com/room";
      const fetchURL = "http://localhost:3001/room";
      const res = await fetch(fetchURL);
      const { rooms } = await res.json();
      setRooms(rooms);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    } finally { 
      setLoading(false); 
    } 
  };
  return (
    <ChatContext.Provider
      value={{
        setMessage,
        message,
        messageReceived,
        setMessageReceived,
        socket,
        username,
        setUsername,
        errorMessage,
        setErrorMessage,
        rooms,
        setRooms,
        setSenderId,
        senderId,
        fetchRooms,
        loading
      }}
    >
      {props.children}
    </ChatContext.Provider>
  );
};

export default ChatState;
