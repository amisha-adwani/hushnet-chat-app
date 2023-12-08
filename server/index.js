const connectToMongo = require("./db");
const http = require("http");
const express = require("express");
const { Server } = require("socket.io");
const { auth, requiresAuth } = require("express-openid-connect");
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

app.get("/info", (req, res) => {
  res.send(req.oidc.isAuthenticated() ? "Logged in" : "Logged out");
});
app.get("/profile", requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});
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

io.on("connection", (socket) => {
  console.log(`user connected: ${socket.id}`);
  socket.on("send_message", ({ message, roomId }) => {
    let skt = socket.broadcast;
    skt = roomId ? skt.to(roomId) : skt;
    socket.emit("receive_message", message);
    console.log("message " + message);
    console.log("roomId " + roomId);
  });
  socket.on("create-room", ({ newRoomId }) => {
    socket.broadcast.emit("create-room", { newRoomId });
    console.log(`user ${socket.id} created and joined new room ${newRoomId}`);
  });
  socket.on("join-room", ({ roomId }) => {
    socket.join(roomId);
    console.log(`user ${socket.id} joined room ${roomId}`);
    console.log("roomid", roomId);
    const allRooms = io.of("/").adapter.rooms;
    const specificRoom = allRooms.get(roomId);
    console.log(`Users in Room ${roomId}:`, specificRoom);
  });
});

server.listen(3001, () => {
  console.log("Example app listening at http://localhost:3001");
});

// socket.broadcast.to(roomId).emit('receive_message', msg);
// const allRooms = io.of("/").adapter.rooms;
// console.log('All Rooms:', allRooms);
