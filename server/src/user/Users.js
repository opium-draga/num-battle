const User = require('./User');

class Users {
  constructor(io) {
    this.io = io;
    Users.users = [];
  }

  static getById(socketId) {
    return Users.users.find(user => user.id === socketId);
  }

  addUser(socket) {
    Users.users.push(new User(socket));

    console.log(`${socket.handshake.query.name} connected, socket id: ${socket.id}`);

    this._emitOnlineUsersUpdate(socket.id);
  }

  removeUser(socket) {
    Users.users = Users.users.filter(user => user.id !== socket.id);

    console.log(`${socket.handshake.query.name} disconnected, socket id: ${socket.id}`);

    this._emitOnlineUsersUpdate(socket.id);
  }

  _emitOnlineUsersUpdate(socketId) {
    this.io.emit('onlineUsers', {
      users: Users.users.filter(user => user.socketId !== socketId)
    });
  }
}

module.exports = Users;
