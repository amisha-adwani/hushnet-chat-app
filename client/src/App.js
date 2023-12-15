import React, { useEffect, useState, useContext } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Profile from "./pages/Profile";
import Room from "./pages/Room";
import ChatState from "./context/ChatState";
import AllRooms from "./pages/AllRooms";
function App() {

  return (
    <div>
      <ChatState>
        <Router>
          <Routes>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/room/" element={<AllRooms />}></Route>
            <Route path="/room/:roomId" element={<Room />}></Route>
          </Routes>
          <NavBar />
        </Router>
      </ChatState>
    </div>
  );
}

export default App;
