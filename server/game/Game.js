const Room = require('./Room');
const _ = require('lodash');

class Game {
  constructor(io) {
    this.io = io;

    this._searchers = [];
    this._gameRooms = [];
  }

  findGame(socket) {
    if (this._searchers.indexOf(socket.id) !== -1) {
      return;
    }

    // TODO: should be user model
    this._searchers.push(socket.id);

    this._tryCreateRoom();

    this._emitQueueUpdate();
    console.log('findGame Update queue: ' + this._searchers.length);
  }

  stopFindGame(socket) {
    let index = this._searchers.indexOf(socket.id);
    if (index !== -1) {
      this._searchers.splice(index, 1);
    }
    this._emitQueueUpdate();
    console.log('stopFindGame Update queue: ' + this._searchers.length);
  }

  _emitQueueUpdate() {
    this.io.emit('queueUpdate', {
      queueAmount: this._searchers.length
    });
  }

  _tryCreateRoom() {
    if (this._searchers.length < 1) {
      return;
    }

    let playersPair = [];
    this._searchers.map(player => {
      playersPair.push(player);

      if (playersPair.length === 2) {
        const room = new Room(this.io, _.cloneDeep(playersPair));
        this._gameRooms.push(room);
        playersPair = [];
      }
    });
  }
}

module.exports = Game;
