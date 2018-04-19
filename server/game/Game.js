const Room = require('./Room');
const _ = require('lodash');



class Game {
  constructor(io) {
    this.io = io;

    Game.rooms = [];
    this._searchers = [];
  }

  findGame(socket) {
    if (this._searchers.indexOf(socket.id) !== -1) {
      return;
    }

    this._searchers.push(socket.id);

    this._emitQueueUpdate();

    this._tryCreateRoom();

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

  removeSearcher(socket) {
    this._searchers = this._searchers.filter(searcher => searcher !== socket.id);
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
        Game.rooms.push(room);
        playersPair = [];
        console.log(`Room with id ${room.roomId} is created!`);
      }
    });
  }
}

module.exports = Game;
