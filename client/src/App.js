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
import Header from "./components/Header";
function App() {
  const [headerName, setHeaderName] = React.useState("hushnet");
  const handleHeaderChange = (newHeader) => {
    setHeaderName(newHeader);
  };

  return (
    <div>
      <ChatState>
        <Router>
        <Header headerName={headerName}/>
          <Routes>
            <Route path="/profile" element={<Profile onChangeHeader={handleHeaderChange}/>}></Route>
            <Route path="/room/" element={<AllRooms />}></Route>
            <Route path="/room/:roomId" element={
              <>
               <Header headerName={headerName} />
                  <Room onChangeHeader={handleHeaderChange} />
              </>
}></Route>
          </Routes>
          <NavBar />
        </Router>
      </ChatState>
    </div>
  );
}

export default App;
