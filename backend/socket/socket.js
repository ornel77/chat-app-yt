import { Server } from 'socket.io';
import http from 'http';
import express from 'express';

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ['http://localhost:3000'],
    methods: ['GET', 'POST'],
  },
});

// get real time msg
export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId]
}

// Get the online status
const userSocketMap = {}; //{userId: socketId}

// socket.on() is used to listen to the events. can be used both on client and server side
// listen for connection
io.on('connection', (socket) => {
  console.log('a user connected', socket.id);
  const userId = socket.handshake.query.userId;
  if (userId != 'undefined') userSocketMap[userId] = socket.id;

  // used to send events to all the connected clients
  io.emit('getOnlineUsers', Object.keys(userSocketMap));

  socket.on('disconnect', () => {
    console.log('user disconnected', socket.id);
    delete userSocketMap[userId];
    io.emit('getOnlineUsers', Object.keys(userSocketMap));
  });
});
export { app, io, server };
