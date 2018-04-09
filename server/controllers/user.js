const Controller = require('./base-controller');

class User extends Controller {
  constructor(io) {
    super(io);
    this._users = [];
  }

  addUser(socket) {
    this._users.push({
      id: socket.id,
      model: JSON.parse(socket.handshake.query.user)
    });

    console.log(`Connected ${socket.handshake.query.user}`);
    this._emitUserAmountUpdate();
  }

  removeUser(socket) {
    this._users = this._users.filter(user => user.id !== socket.id);

    console.log(`Disconnected ${socket.id}`);
    this._emitUserAmountUpdate();
  }

  _emitUserAmountUpdate() {
    this.io.emit('userAmountUpdate', {
      activeUsersAmount: this._users.length
    });
  }
}

module.exports = User;
