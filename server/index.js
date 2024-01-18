const connectToMongo = require("./db");
const http = require("http");
const express = require("express");
const { Server } = require("socket.io");
const { auth, requiresAuth } = require("express-openid-connect");
const Room = require("./models/Room");
const router = require("./routes/room");
const cors = require("cors");
require("dotenv").config();
connectToMongo();
const path = require("path");
const app = express();
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

app.use("/room", router);


io.on("connection", (socket) => {
  socket.on("send_message", ({ message, roomId, senderId }) => {
    io.to(roomId).emit("receive_message", { message, senderId });
  });
  socket.on("create-room", ({ newRoomId, senderId }) => {
    const room = new Room({
      roomId: newRoomId,
      userId: senderId,
    });
    room.save();
    socket.broadcast.emit("create-room", { newRoomId });
  });
  socket.on("join-room", ({ roomId, senderId }) => {
    try {
      socket.join(roomId);
      io.to(roomId).emit("user-join",  senderId );
    } catch (error) {
      console.log('[error]','join room :',error);
      socket.emit('error','couldnt perform requested action');
    }
  });
  socket.on("leave-room", ({ roomId, senderId }) => {
    try {
      socket.leave(roomId);
      io.to(roomId).emit("user-left",  senderId );
    } catch (error) {
      console.log('[error]','join room :',error);
      socket.emit('error','couldnt perform requested action');
    }
  });
});

const port = process.env.PORT || 3001;

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});


