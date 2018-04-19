const User = require('./User');
// const Game = require('../game/Game');

class Users {
  constructor(io) {
    this.io = io;
    Users.users = [];
  }

  static getById(id) {
    return Users.users.find(user => user.id === id);
  }

  addUser(socket) {
    const user = new User(socket, JSON.parse(socket.handshake.query.user));
    Users.users.push(user);
    console.log(`Connected ${socket.handshake.query.user}`);
    this._emitUserAmountUpdate();
  }

  removeUser(socket) {
    Users.users = Users.users.filter(user => user.id !== socket.id);
    console.log(`Disconnected ${socket.id}`);
    this._emitUserAmountUpdate();
  }

  _emitUserAmountUpdate() {
    this.io.emit('userAmountUpdate', {
      activeUsersAmount: Users.users.length
    });
  }
}

module.exports = Users;
