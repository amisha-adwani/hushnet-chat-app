import React, { useContext, useState, useEffect } from "react";
import ChatContext from "../context/ChatContext";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

const AllRooms = () => {
  const context = useContext(ChatContext);
  const { socket} = context;
  const [rooms, setRooms] = useState([]);
  const [open, setOpen] = useState(false);
  const [newRoomId, setNewRoomId] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    setNewRoomId(e.target.value);
  };



  const newRoom = () => {
    socket.emit("create-room", { newRoomId, senderId: socket.id });
    handleClose();
  };

  const fetchRooms = async () => {
    try {
      const res = await fetch("http://localhost:3001/room");
      const { rooms } = await res.json();
      setRooms(rooms);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  useEffect(() => {
    fetchRooms();
    const handleCreateRoom = ({newRoomId}) => {
      setRooms((prevRooms) => [...prevRooms, { roomId: newRoomId }]);
    };

    socket.on("create-room", handleCreateRoom);

    return () => {
      socket.off("create-room", handleCreateRoom);
    };
  }, [socket, rooms]);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "white",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <TextField
              id="outlined-basic"
              label="Room Name"
              variant="outlined"
              onChange={handleChange}
            />
            <Button
              id="modal-modal-description"
              sx={{ m: 2 }}
              variant="contained"
              onClick={newRoom}
            >
              Save
            </Button>
          </Box>
        </Modal>
      </div>
      <h1> All Rooms</h1>
      {rooms.map((room) => (
        <Button
          variant="outlined"
          key={String(room.roomId)}
          onClick={() => navigate(`/room/${room.roomId}`)}
        >
          {room.roomId}
        </Button>
      ))}
      <Button variant="contained" onClick={handleOpen}>
        New Room
      </Button>
    </div>
  );
};

export default AllRooms;
