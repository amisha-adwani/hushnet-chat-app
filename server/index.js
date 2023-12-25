const connectToMongo = require("./db");
const http = require("http");
const express = require("express");
const { Server } = require("socket.io");
const { auth, requiresAuth } = require("express-openid-connect");
const Room = require("./models/Room");
const router = require('./routes/room')
const cors = require('cors')
require("dotenv").config();
connectToMongo();
const app = express();

app.use(
  auth({
    authRequired: false,
    auth0Logout: true,
    secret: process.env.secret,
    baseURL: process.env.baseURL,
    clientID: process.env.clientID,
    issuerBaseURL: process.env.issuerBaseURL,
  })
);
 
app.use(cors())
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // Specify the allowed origin
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => {
  res.send("Hello world");
});
app.use('/room', router)
io.on("connection", (socket) => {
  socket.on("send_message", ({ message, roomId, senderId }) => {
    io.to(roomId).emit("receive_message", { message, senderId });
  });
  socket.on("create-room", ({ newRoomId,senderId }) => {
    const room = new Room ({
      name: 'Test',
      roomId:newRoomId,
      userId :senderId
    })
    room.save()
    socket.broadcast.emit("create-room", { newRoomId });
  });
  socket.on("join-room", ({ roomId }) => {
    socket.join(roomId);
  });
});

server.listen(3001, () => {
  console.log("Example app listening at http://localhost:3001");
});
