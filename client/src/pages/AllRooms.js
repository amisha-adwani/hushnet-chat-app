import React, { useContext, useState, useEffect } from "react";
import ChatContext from "../context/ChatContext";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
const AllRooms = ({ onChangeHeader }) => {
  const context = useContext(ChatContext);
  const { socket,username } = context;
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
      const fetchURL = "https://hushnet.onrender.com/room"
      const res = await fetch(fetchURL);
      const { rooms } = await res.json();
      setRooms(rooms);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    }
  };

  useEffect(() => {
      onChangeHeader(`welcome ${username}, join a chat or create your own`);
    fetchRooms();
    const handleCreateRoom = ({ newRoomId }) => {
      setRooms((prevRooms) => [...prevRooms, { roomId: newRoomId }]);
    };

    socket.on("create-room", handleCreateRoom);

    return () => {
      socket.off("create-room", handleCreateRoom);
    };
  }, [socket, rooms,onChangeHeader]);

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
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography sx={{pb:1}}>Please enter a unique room name</Typography>
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
      <Button variant="contained" onClick={handleOpen} sx={{ mt: 10, mb:2, ml: 2 }}>
        New Room
      </Button>
      <TableContainer component={Paper} sx={{ ml:2, width:'95%'}} >
        <Table aria-label="simple table" >
          <TableBody>
            {rooms.map((room) => (
              <TableRow
                key={room.roomId}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                onClick={() => navigate(`/room/${room.roomId}`)}
              >
                <TableCell component="th" scope="row" sx={{cursor:'pointer', fontWeight:600}}>
                 {room.roomId}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default AllRooms;
