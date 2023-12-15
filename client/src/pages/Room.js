import { React, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ChatBox from "../components/ChatBox";
import ChatContext from "../context/ChatContext";
const Room = () => {
  const params = useParams();
  const context = useContext(ChatContext);
  const { socket } = context;


  useEffect(() => {
  socket.emit("join-room", { roomId: params.roomId });
}, [socket]);

  return (
    <div>
      <ChatBox />
    </div>
  );
};

export default Room;

