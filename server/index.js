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

const user={}
io.on("connection", (socket) => {
  socket.on('user-joined', username =>{
    user[socket.id]= username
    console.log(user[socket.id])
  })
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
  socket.on("remove-room", async ({ roomId, senderId }) => {
    console.log(roomId)
  const deleted = await Room.deleteOne({ roomId: roomId })
    console.log(deleted)
  });
  // socket.broadcast.emit("room-removed", { newRoomId });
  socket.on("join-room", ({ roomId, senderId }) => {
    try {
      socket.join(roomId);
      io.to(roomId).emit("user-join",  {senderId: user[socket.id]}  );
    } catch (error) {
      console.log('[error]','join room :',error);
      socket.emit('error','couldnt perform requested action');
    }
  });
  socket.on("leave-room", ({ roomId, senderId }) => {
    try {
      socket.leave(roomId);
      io.to(roomId).emit("user-left",  {senderId: user[socket.id]} );
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


