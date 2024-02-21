import React, { useContext, useState, useEffect } from "react";
import ChatContext from "../context/ChatContext";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import CardHeader from "@mui/material/CardHeader";
import Details from "../components/Avatar";
import Modal2 from "../components/Modal";
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import Loading from "../components/LoadingSpinner";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
const AllRooms = ({ onChangeHeader }) => {
  const context = useContext(ChatContext);
  const { socket, username ,
    setErrorMessage,
    errorMessage,rooms, setRooms} = context;
  const [open, setOpen] = useState(false);
  const [newRoomId, setNewRoomId] = useState("New Room");
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    setNewRoomId(e.target.value);
  };
  const handleError = (error) => {
    setErrorMessage(error);
    setTimeout(() => {
      setErrorMessage(""); 
    }, 3000);
  };

  const newRoom = () => {
    socket.emit("create-room", { newRoomId, senderId: socket.id });
    handleClose();
    fetchRooms();
  };
  const fetchRooms = async () => {
    try {
      setLoading(true); 
      const fetchURL = "https://hushnet.onrender.com/room";
      const res = await fetch(fetchURL);
      const { rooms } = await res.json();
      setRooms(rooms);
    } catch (error) {
      console.error("Error fetching rooms:", error);
    } finally { 
      setLoading(false); 
    } 
  };
  const handleCreateRoom = ({ newRoomId }) => {
    setRooms((prevRooms) => [...prevRooms,  newRoomId ]);
  };

  useEffect(() => {
    socket.on("error", handleError);
   onChangeHeader(`welcome ${username}, join a chat or create your own`);
    fetchRooms();
    socket.on("created-room", handleCreateRoom);

    return () => {
      socket.off("created-room", handleCreateRoom);
    };
    // eslint-disable-next-line 
  }, [socket]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [searchQuery, setSearchQuery] = useState('');
  const filteredRooms = rooms.filter(room => {
    return room.roomId.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <>
      <Modal2
        name={newRoomId}
        title={"Please enter a unique room name"}
        handleChange={handleChange}
        handleClick={newRoom}
        open={open}
        onClose={handleClose}
        placeholder={newRoomId}
      />
      <Box sx={{mt:10, display:'flex', justifyContent:'space-between',mb: 3, ml:3,mr:3}}>
    
      <Button
       variant="contained"
       size="medium"
        onClick={handleOpen}
        sx={{ height:50 }}
        endIcon={<AddCircleOutlinedIcon/> }
      >
        New Room
      </Button>
      <TextField
           value={searchQuery}
           onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            sx={{ width: 500 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          ></TextField>
              
      </Box>
      {loading &&
      <Loading/>}
      <Box>
              {errorMessage &&  (
          <Typography component="div" ml={2}>
            Error: {errorMessage}
          </Typography>
        )}
        <TableContainer
          component={Paper}
          sx={{ mx: 1, width: "99%", mb:3,overflowY: 'auto', height:495
         }}
        >
          <Table aria-label="simple table" height= "max-content">
            <TableBody>
              {(filteredRooms && filteredRooms.length > 0 ? filteredRooms : rooms).map((room) => (
                <TableRow
                  key={room._id}
                  onClick={() => navigate(`/room/${room.roomId}`)}
                >
                  <TableCell 
                     component="td"
                    align="left"
                    sx={{ cursor: "pointer", fontWeight: 600 }}
                  > 
                  <CardHeader
                  sx={{ textAlign: 'left', mx:3 }}
                    avatar={<Details name={room.roomId}/>}
                    title={room.roomId}
                    titleTypographyProps={{variant:'h9' }}
                  />
                   </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <Box>

      </Box>
    </>
  );
};

export default AllRooms;
