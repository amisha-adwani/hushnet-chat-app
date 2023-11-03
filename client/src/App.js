import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './App.css';
import ChatBox from './components/ChatBox';

const socket = io('http://localhost:3001');

function App() {
  const [message,setMessage]= useState('')
  const [messageReceived, setMessageReceived] = useState('')
  const handleClick= ()=>{
    socket.emit('send_message',message)
  }
  const handleChange= (e)=>{
    setMessage(e.target.value)
  }
  
  useEffect(()=>{
    socket.on("receive_message",(msg)=>{
      setMessageReceived(msg)
    })
  })
  return (
    <div className="App">
      <ChatBox handleClick={handleClick} handleChange={handleChange} message={messageReceived}/>
    </div>
  );
}

export default App;
