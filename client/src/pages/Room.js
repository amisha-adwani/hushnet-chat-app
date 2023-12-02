import { React, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import ChatBox from "../components/ChatBox";
import ChatContext from "../context/ChatContext";

const Room = () => {
  const context = useContext(ChatContext);
  const { socket } = context;
  const params = useParams();
  const roomId = params.roomId;
  useEffect(() => {
    socket.emit("join-room", { roomId: roomId });
  }, [socket]);

  return (
    <div>
      Room {roomId}
      <ChatBox />
    </div>
  );
};

export default Room;
