import React, { useEffect, useState, useContext } from "react";
import "./App.css";
import NavBar from "./components/NavBar";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import Profile from "./pages/Profile";
import Room from "./pages/Room";
import Solo from "./pages/Solo";
import ChatState from "./context/ChatState";

function App() {
  return (
    <div>
      <ChatState>
        <Router>
          <Routes>
            <Route path="/solo" element={<Solo />}></Route>
            <Route path="/profile" element={<Profile />}></Route>
            <Route path="/room/:roomId" element={<Room />}></Route>
          </Routes>
          <NavBar />
        </Router>
      </ChatState>
    </div>
  );
}

export default App;
