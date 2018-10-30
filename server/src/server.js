const http = require('http');
const express = require('express');
const port = process.env.PORT || 3000;
const socketIO = require('socket.io');
const app = new express();
const server = http.createServer(app);
const io = socketIO(server);

let Users = require('./user/Users');
Users = new Users(io);

let Game = require('./game/Game');
Game = new Game(io);

io.on('connection', socket => {
  Users.addUser(socket);

  socket.on('disconnect', () => {
    Users.removeUser(socket);
    Game.removeSearcher(socket);
  });

  socket.on('findGame', () => Game.findGame(socket));
  socket.on('stopFindGame', () => Game.stopFindGame(socket));
});

// export the server so it can be easily called for testing
exports.server = server.listen(port, () => {
  console.log(`Server is running on ${port} port...`);
});

