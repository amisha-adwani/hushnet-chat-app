import { React, useContext, useState,useEffect } from "react";
import ChatContext from "../context/ChatContext";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

const AllRooms = () => {
  const context = useContext(ChatContext);
  const {  socket,setNewRoomId } = context;
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();
  const newRoomId = (Math.random() * 10).toFixed(4);
  const newRoom = () => {
    socket.emit("create-room", { newRoomId: newRoomId, senderId: socket.id });
    // navigate(`/room/${newRoomId}`);
    setRooms([...rooms, newRoomId]);
    setNewRoomId(newRoomId);
  };
  useEffect(() => {
    async function fetchRooms() {
      const res = await fetch("https://hushnet25.onrender.com/room");
      const {rooms} = await res.json();
      setRooms(rooms)
    }
    fetchRooms();
  }, []);
  useEffect(() => {
    const handleCreateRoom = ({ newRoomId }) => {
      setRooms((prevRooms) => [...prevRooms, newRoomId]);
    };
    socket.on("create-room", handleCreateRoom);
    return () => {
      socket.off("create-room", handleCreateRoom);
    };
  }, [socket, rooms]);

  return (
    <div>
      <h1> All Rooms</h1>
      { rooms.map((room) => (
        <Button
          variant="outlined"
          key={room._id}
          onClick={() => navigate(`/room/${room.roomId}`)}
        >
          Room {room.roomId}
        </Button>
      ))}
      <Button variant="contained" onClick={newRoom}>
        New Room
      </Button>
    </div>
  );
};

export default AllRooms;
