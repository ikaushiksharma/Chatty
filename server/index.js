const express = require("express");
const cors = require("cors");
const app = express();
const { Server } = require("socket.io");
app.use(cors());
const io = new Server({
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);
  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });
  socket.on("disconnect", () => {
    console.log("user disconnected", socket.id);
  });
});
const port = 3001;

io.listen(port, () => {
  console.log("the server is running on port", port);
});
