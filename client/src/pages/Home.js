import React, { useContext,useEffect ,useState} from "react";
import Box from "@mui/material/Box";
import ChatContext from "../context/ChatContext";
import { useNavigate } from "react-router-dom";
import Modal2 from '../components/Modal'
 const Home = ({onChangeHeader}) => {
  const context = useContext(ChatContext);
  const { socket,setUsername,username } = context;
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(true);
  const handleClick = () => {
    socket.emit("user-joined", {username, senderId: socket.id});
    navigate('/room');
    handleOpen()
  };
  useEffect(() => {
    onChangeHeader('hushnet')
  }, [onChangeHeader]);

  const handleChange = (e) => {
    e.preventDefault();
    setUsername(e.target.value);
  };
 
  

  return (
    <Box >
      <Modal2 name={username} title={'Please enter a username to begin'}
      handleChange={handleChange}
      open={open}
      handleClick={handleClick}
      onClose={handleClose}
      placeholder={username}
      display={'none'}/>
    </Box>
  );
};
export default Home;
