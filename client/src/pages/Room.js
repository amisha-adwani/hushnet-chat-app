import { React, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ChatBox from "../components/ChatBox";
import ChatContext from "../context/ChatContext";
import Header from "../components/Header";
const Room = ({onChangeHeader}) => {
  const params = useParams();
  const context = useContext(ChatContext);
  const { socket } = context;


  useEffect(() => {
  socket.emit("join-room", { roomId: params.roomId });
  onChangeHeader(`Room ${params.roomId}`)
}, [socket]);


  return (
    <div>
      <ChatBox />
    </div>
  );
};

export default Room;

