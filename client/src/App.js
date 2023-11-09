import React, { useEffect, useState, useContext } from "react";
import io from "socket.io-client";
import "./App.css";
import NavBar from "./components/NavBar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Profile from "./pages/Profile";
import Room from "./pages/Room";
import Solo from "./pages/Solo";

const socket = io("http://localhost:3001");

function App() {
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  const handleClick = () => {
    socket.emit("send_message", message);
  };
  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  useEffect(() => {
    socket.on("receive_message", (msg) => {
      setMessageReceived(msg);
    });
  }, []);

  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/solo"
            element={
              <Solo handleClick={handleClick} handleChange={handleChange} />
            }
          ></Route>
          <Route path="/profile" element={<Profile />}></Route>
          <Route path="/room" element={<Room />}></Route>
        </Routes>
        <NavBar />
      </Router>
    </div>
  );
}

export default App;
