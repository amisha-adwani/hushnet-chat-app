const connectToMongo = require("./db");
const http = require("http");
const express = require("express");
const { Server } = require("socket.io");
const Room = require("./models/Room");
const User = require("./models/User");
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
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use("/room", router);

io.on("connection", (socket) => {
  socket.on("user-joined", ({ username, senderId }) => {
    const user = new User({
      username: username,
      userId: senderId,
    });
    user.save();
  });
  socket.on("send_message", ({ message, roomId, senderId,username }) => {
    io.to(roomId).emit("receive_message", { message, senderId,username });
  });
  socket.on("create-room", async ({ newRoomId, senderId }) => {

    const room = new Room({
      roomId: newRoomId,
      userId: senderId,
    });
    room.save();
    socket.broadcast.emit("created-room", { newRoomId });
    const user = await User.findOne({ userId: senderId });
    if (user) {
      await User.findOneAndUpdate(
        { userId: senderId },
        { $push: { roomsOwned: newRoomId } }
      );
    }
   
  });
  socket.on("remove-room", async ({ roomId, senderId }) => {
    const user = await User.findOne({ userId: senderId });
    if (user && user.roomsOwned.includes(roomId)) {
       await Room.deleteOne({ roomId: roomId });
    } else {
      socket.emit("error", "You are not the owner of the room");
    }
  });
  socket.on("join-room", ({ roomId, username }) => {
    try {
      socket.join(roomId);
      io.to(roomId).emit("user-join", username);
    } catch (error) {
      socket.emit("error", "couldnt perform requested action");
    }
  });
  socket.on("leave-room", ({ roomId, username }) => {
    try {
      socket.leave(roomId);
      io.to(roomId).emit("user-left", username);
    } catch (error) {
      socket.emit("error", "couldnt perform requested action");
    }
  });
});
app.get('/', (req, res) => {
  req.send('Server is up and running')
})

const port = process.env.PORT || 3001;

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
