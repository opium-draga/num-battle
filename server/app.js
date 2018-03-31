const http = require('http');
const express = require('express');
const path = require('path');

const port = process.env.PORT || 3000;
const socketIO = require('socket.io');

const app = new express();
const server = http.createServer(app);
const io = socketIO(server);

let users = [];
let gameSearch = [];

io.on('connection', socket => {
  let connectedUser = {
    id: socket.id,
    model: JSON.parse(socket.handshake.query.user)
  };
  users.push(connectedUser);
  console.log(`Connected ${socket.handshake.query.user}`);

  io.emit('userAmountUpdate', {
    activeUsersAmount: users.length
  });

  socket.on('disconnect', () => {
    users = users.filter(user => user.id !== socket.id);
    console.log(`Disconnected ${socket.id}`);
  });

  socket.on('findGame', () => {
    if (gameSearch.indexOf(socket.id) !== -1) {return;}
    gameSearch.push(socket.id);
    io.emit('queueUpdate', {
      queueAmount: gameSearch.length
    });
    console.log('findGame Update queue: ' + gameSearch.length);
  });

  socket.on('stopFindGame', () => {
    let index = gameSearch.indexOf(socket.id);
    if (index !== -1) {
     gameSearch.splice(index, 1);
    }
    io.emit('queueUpdate', {
      queueAmount: gameSearch.length
    });
    console.log('stopFindGame Update queue: ' + gameSearch.length);
  });
});


app.use(express.static(path.join(__dirname, '../public')));

server.listen(port, () => {
  console.log(`Server is running on ${port} port :)`);
});
