// src/lib/socket.js
import express from "express";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
    credentials: true,
  },
});
export const getRecieverSocketId=(userId)=>{
    const normalizedUserId = (userId || "").toLowerCase();
    return userSocketMap[normalizedUserId];
}
const userSocketMap={};
io.on("connection", (socket) => {
  console.log("A user connected", socket.id);
  const rawUserId = socket.handshake.query.userId;
  const userId = (rawUserId || "").toLowerCase();
  if (userId) {
    userSocketMap[userId] = socket.id;
    console.log(`User ${userId} connected. Socket ID: ${socket.id}`);
  }
  console.log("Emitting online users:", Object.keys(userSocketMap));
  io.emit("getOnlineUsers", Object.keys(userSocketMap));
  socket.on("disconnect", () => {
    console.log("A user diconnected", socket.id);
    if (userId) delete userSocketMap[userId];
    console.log("Emitting online users after disconnect:", Object.keys(userSocketMap));
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { app, server, io };
