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
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use("/room", router);
//Deployment
const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  const clientBuildPath = path.join(__dirname1, "client", "build");

  app.use(express.static(clientBuildPath));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(clientBuildPath, "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("Hello world");
  });
}
const port = process.env.PORT || 3001;

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

io.on("connection", (socket) => {
  socket.on("send_message", ({ message, roomId, senderId }) => {
    io.to(roomId).emit("receive_message", { message, senderId });
  });
  socket.on("create-room", ({ newRoomId, senderId }) => {
    const room = new Room({
      name: "Test",
      roomId: newRoomId,
      userId: senderId,
    });
    room.save();
    socket.broadcast.emit("create-room", { newRoomId });
  });
  socket.on("join-room", ({ roomId }) => {
    socket.join(roomId);
  });
});


