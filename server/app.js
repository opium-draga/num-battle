const http = require('http');
const express = require('express');
const path = require('path');
const port = process.env.PORT || 3000;
const socketIO = require('socket.io');
const app = new express();
const server = http.createServer(app);
const io = socketIO(server);

const Game = require('./controllers/game');
const User = require('./controllers/user');

const game = new Game(io);
const user = new User(io);

io.on('connection', socket => {
  user.addUser(socket);

  socket.on('disconnect', () => user.removeUser(socket));

  socket.on('findGame', () => game.findGame(socket));

  socket.on('stopFindGame', () => game.stopFindGame(socket));
});


app.use(express.static(path.join(__dirname, '../public')));

server.listen(port, () => {
  console.log(`Server is running on ${port} port :)`);
});
