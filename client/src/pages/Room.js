import { React, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ChatBox from "../components/ChatBox";
import ChatContext from "../context/ChatContext";
const Room = ({ onChangeHeader }) => {
  const params = useParams();
  const context = useContext(ChatContext);
  const { socket,username } = context;
  const roomId = params.roomId;
  const [userNotification, setUserNotification] = useState([]);
  useEffect(() => {
    socket.on("user-join", (username) => {
      setUserNotification((prevNotification) => [
        ...prevNotification,
        `${username} has joined the room ${roomId}`,
      ]);
    });
    socket.on("user-left", (username) => {
      setUserNotification((prevNotification) => [
        ...prevNotification,
        `${username} has left the room ${roomId}`,
      ]);
    });
    socket.emit("join-room", { roomId,username });
     onChangeHeader(`${roomId}`);
  }, [socket]);

  return (
    <div>
      <ChatBox userNotification={userNotification}/>
    </div>
  );
};

export default Room;
