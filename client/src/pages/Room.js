import { React, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ChatBox from "../components/ChatBox";
import ChatContext from "../context/ChatContext";
import Header from "../components/Header";
const Room = ({ onChangeHeader }) => {
  const params = useParams();
  const context = useContext(ChatContext);
  const { socket } = context;
  const senderId = socket.id;
  const roomId = params.roomId;
  const [userNotification, setUserNotification] = useState([]);
  useEffect(() => {
    socket.on("user-join", (data) => {
      setUserNotification((prevNotification) => [
        ...prevNotification,
        `${data.senderId} has joined the room ${roomId}`,
      ]);
    });
    socket.on("user-left", (data) => {
      setUserNotification((prevNotification) => [
        ...prevNotification,
        `${data.senderId} has left the room ${roomId}`,
      ]);
    });
    socket.emit("join-room", { roomId, senderId });
    onChangeHeader(`${roomId}`);
  }, [socket]);

  return (
    <div>
      <ChatBox userNotification={userNotification}/>
    </div>
  );
};

export default Room;
