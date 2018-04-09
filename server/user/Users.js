const User = require('./User');

class Users {
  constructor(io) {
    this.io = io;
  }

  static getById(id) {
    return this.users.find(user => user.id === id);
  }

  addUser(socket) {
    const user = new User(socket, JSON.parse(socket.handshake.query.user));
    this.users.push(user);
    console.log(`Connected ${socket.handshake.query.user}`);
    this._emitUserAmountUpdate();
  }

  removeUser(socket) {
    this.users = this.users.filter(user => user.id !== socket.id);
    console.log(`Disconnected ${socket.id}`);
    this._emitUserAmountUpdate();
  }

  _emitUserAmountUpdate() {
    this.io.emit('userAmountUpdate', {
      activeUsersAmount: this.users.length
    });
  }
}

Users.users = [];

module.exports = Users;
