import { React, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ChatBox from "../components/ChatBox";
import ChatContext from "../context/ChatContext";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
const Room = () => {
  const context = useContext(ChatContext);
  const { socket, roomId } = context;
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();
  const newRoomId = (Math.random() * 10).toFixed(4);

  useEffect(() => {
    socket.on('create-room', ({ newRoomId }) => {
      setRooms((prevRooms) => [...prevRooms, newRoomId]);
    });
  })

  const newRoom = () => {
    // socket.on("join-room", { roomId: roomId });
    socket.emit("create-room", { newRoomId: newRoomId });
    navigate(`/room/${newRoomId}`);
    setRooms([...rooms, newRoomId]);
    console.log(newRoomId);
  };
  return (
    <div>
      {rooms.map((room) => (
        <Button variant="outlined" key={room} onClick={() => navigate(`/room/${room}`)}>
          Room {room}
        </Button>
      ))}
      <Button variant="contained" onClick={newRoom}>
        New Room
      </Button>
      <ChatBox roomId={newRoomId} />
    </div>
  );
};

export default Room;
// const params = useParams();
// const newRoomId = params.roomId;
// useEffect(() => {
//   socket.emit("join-room", { roomId: roomId });
// }, [socket]);
