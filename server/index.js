const connectToMongo = require("./db");
const http = require("http");
const express = require("express");
const { Server } = require("socket.io");
const Room = require("./models/Room");
const User = require("./models/User");
const router = require("./routes/room");
const authRouter = require("./routes/auth");
const cors = require("cors");
const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
require("dotenv").config();
connectToMongo();
const app = express();
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use("/auth", authRouter);
app.use("/room", router);

io.on("connection", (socket) => {
  socket.on("send_message", ({ message, roomId, senderId, username }) => {
    io.to(roomId).emit("receive_message", { message, senderId, username });
  });
  socket.on("create-room", async ({ newRoomId, senderId, username }) => {
    const room = new Room({
      roomId: newRoomId,
      members: [{ memberId: senderId, memberName: username }],
    });
    room.save();
    socket.broadcast.emit("created-room", { newRoomId });
    const userId = new ObjectId(senderId);
    const user = await User.findOne({ _id: userId });
    if (user) {
      await User.findOneAndUpdate(
        { _id: userId },
        { $push: { roomsOwned: newRoomId } }
      );
    }
  });
  socket.on("remove-room", async ({ roomId, senderId }) => {
    try {
      const userId = new ObjectId(senderId);
      const user = await User.findOne({ _id: userId });
      const matcher = user._id.equals(userId);

      if (matcher) {
        if (user.roomsOwned.includes(roomId)) {
         Room.deleteOne({ roomId: roomId })
        } else {
          console.log("error");
        }
      } else {
        console("ERROR");
      }
    } catch (error) {
      console.error("Error finding user:", error);
    }
  });

  socket.on("join-room", async ({ roomId, username, senderId }) => {
    try {
      socket.join(roomId);
      const room = await Room.findOne({ roomId: roomId });
      if (room) {

        await Room.findOneAndUpdate(
          { roomId: roomId },
          { $push: { members: { memberId: senderId, memberName: username } } }
        );

        io.to(roomId).emit("user-join", username);
      } else {
        console.log("ERROR joining room");
      }
    } catch (error) {
      socket.emit("error", "couldnt perform requested action");
    }
  });
  socket.on("leave-room", async ({ roomId, username, senderId }) => {
    try {
      await Room.findOneAndUpdate(
        { roomId: roomId },
        { $pull: { members: { memberId: senderId, memberName: username } } },
        { new: true }
      );
      socket.leave(roomId);
      io.to(roomId).emit("user-left", username);
    } catch (error) {
      socket.emit("error", "couldnt perform requested action");
    }
  });
});
app.get("/", (req, res) => {
  req.send("Server is up and running");
});

const port = process.env.PORT || 3001;

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
