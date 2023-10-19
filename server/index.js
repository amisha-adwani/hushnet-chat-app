const connectToMongo = require("./db");
const http = require("http");
const express = require("express");
const { Server } = require("socket.io");

connectToMongo();

const app = express();
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
  console.log("Connection established");
});

server.listen(3001, () => {
  console.log("Example app listening at http://localhost:3001");
});
