import React, { useEffect,useContext } from 'react'
import Box from "@mui/material/Box";
import ChatContext from "../context/ChatContext";
import { Typography } from '@mui/material';
const Profile = ({ onChangeHeader }) => {
  const context = useContext(ChatContext);
  const { username } = context;
    useEffect(() => {
      // Example: Change the headerName based on some condition
      onChangeHeader("Profile");
    }, [onChangeHeader]);
  return (
    <div>
      <Box sx={{mt:9}}>
      <h1 >Profile</h1>
      <Typography>User: {username}</Typography>
      </Box>
    </div>
  )
}

export default Profile
