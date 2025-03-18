const express = require('express');
const app = express();
const http = require('http');
const cors = require('cors');
const {Server} = require('socket.io');
const server = http.createServer(app);
app.use(cors());

const io = new Server(server, { cors: { origin: 'http://localhost:3000' },methods: ["GET", "POST"] });

io.on('connection', (socket) => {
    console.log('a user connected',socket.id);
    socket.on('join_room', (room) => {
        console.log(`user ${socket.id} joined room ${room}`);
        socket.join(room);
    });

    socket.on('send_message', (message) => {
        console.log(`user ${socket.id} sent message ${JSON.stringify(message)}`);
        io.to(message.room).emit('receive_message', message);
    });

    socket.on('user_left', (room) => {
        console.log(`user ${socket.id} left room ${room}`);
        socket.leave(room);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected',socket.id);
    });
   
});

server.listen(3001, () => {
  console.log('Server is running on port 3001');
});