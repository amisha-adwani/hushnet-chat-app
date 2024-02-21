import React,{  useState,useEffect } from 'react'
import Avatar from "@mui/material/Avatar";
const Details = ({name}) => {
    const [initials, setInitials] = useState('')
    useEffect(() => {
      if (name) {
        const [firstName, lastName] = name.split(' ');
        if (firstName && lastName) {
          const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
          setInitials(initials);
        } else {
          const initials = `${name.charAt(0)}`.toUpperCase();
          setInitials(initials);
        }
      }
    }, [name]);
    
    
  return (
    <div>
        <Avatar sx={{mx:2,my:0.5}}>
        {initials}
        </Avatar>
    </div>
  )
}

export default Details
