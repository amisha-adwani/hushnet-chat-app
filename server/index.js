const connectToMongo = require("./db");
const http = require("http");
const express = require("express");
const { Server } = require("socket.io");
const { auth, requiresAuth } = require('express-openid-connect');
require('dotenv').config();
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
)

app.get('/info', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});
app.get('/profile',requiresAuth(),(req,res)=>{
  res.send(JSON.stringify(req.oidc.user));
})
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
  socket.on("send_message", (msg) => {
    socket.broadcast.emit('receive_message', msg)
    console.log("message " + msg);
  });
});

server.listen(3001, () => {
  console.log("Example app listening at http://localhost:3001");
});
