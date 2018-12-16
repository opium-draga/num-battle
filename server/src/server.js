const http = require('http');
const express = require('express');
const port = process.env.PORT || 3000;
const socketIO = require('socket.io');
const app = new express();
const server = http.createServer(app);
const io = socketIO(server);

let Users = require('./user/Users');
Users = new Users(io);

let Maker = require('./game/Maker');
Maker = new Maker(io);

io.on('connection', socket => {
  Users.addUser(socket);

  socket.on('disconnect', () => {
    Users.removeUser(socket);
    Maker.removeSearcher(socket);
  });

  socket.on('startSearch', () => Maker.startSearch(socket));
  socket.on('stopSearch', () => Maker.removeSearcher(socket));
});

// export the server so it can be easily called for testing
exports.server = server.listen(port, () => {
  console.log(`Server is running on ${port} port...`);
});
exports.Maker = Maker;
exports.Users = Users;
