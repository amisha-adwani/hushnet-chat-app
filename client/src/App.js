import React, { useEffect } from 'react';
import io from 'socket.io-client';
import './App.css';
import ChatBox from './components/ChatBox';

const socket = io('http://localhost:3001');

function App() {
  const handleClick= ()=>{
    socket.emit('send_message','Hello world')
  }
  
  useEffect(()=>{
    socket.on("receive_message",(msg)=>{
      alert(msg)
    })
  })
  return (
    <div className="App">
      <ChatBox handleClick={handleClick}/>
    </div>
  );
}

export default App;
