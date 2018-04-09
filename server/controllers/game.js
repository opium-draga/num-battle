const IOController = require('./base-controller');

class Game extends IOController {
  constructor(io) {
    super(io);
    this._gameSearch = [];
  }

  findGame(socket) {
    if (this._gameSearch.indexOf(socket.id) !== -1) {
      return;
    }
    this._gameSearch.push(socket.id);
    this._emitQueueUpdate();
    console.log('findGame Update queue: ' + this._gameSearch.length);
  }

  stopFindGame(socket) {
    let index = this._gameSearch.indexOf(socket.id);
    if (index !== -1) {
      this._gameSearch.splice(index, 1);
    }
    this._emitQueueUpdate();
    console.log('stopFindGame Update queue: ' + this._gameSearch.length);
  }

  _emitQueueUpdate() {
    this.io.emit('queueUpdate', {
      queueAmount: this._gameSearch.length
    });
  }
}

module.exports = Game;
