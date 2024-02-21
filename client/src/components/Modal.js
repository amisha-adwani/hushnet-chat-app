import React, { useContext, useState, useEffect, useCallback } from "react";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Details from "./Avatar";
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
const Modal2 = (props) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "white",
    p: 4,
    border:'1px solid lightblue',boxShadow:"0px 4px 4px "
  };
  
  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <Button
              onClick={props.onClose}
              cursor='pointer'
              sx={{ml:42, color:'black', height:40, borderRadius:50,display:`${props.display}`}}
              startIcon={<CancelRoundedIcon sx={{pl:2}}/>}
             ></Button>
          <Typography sx={{ ml:3,mb:3, fontWeight:600 }}>{props.title}</Typography>
          <Box
           sx={{ display: "flex", justifyContent: "flex-right" }}
          >
            <Details name={props.name}/>
            <TextField
              id="outlined-basic"
              variant="outlined"
              onChange={props.handleChange}
              sx={{  width:290}}
              placeholder={props.placeholder}
            />
              </Box>
            <Box sx={{display:'flex',flexDirection: 'row'}}>
           
            <Button
            variant="contained"
            onClick={props.handleClick}
            cursor='pointer'
            sx={{ mt: 3, ml: 34, height:40 }}
           endIcon={<ArrowForwardIosOutlinedIcon/>}
             >
              Save
             </Button>
            </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default Modal2;
