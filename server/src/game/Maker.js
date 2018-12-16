const Game = require('./Game');
const _ = require('lodash');

class Maker {
  constructor(io) {
    this.io = io;
    Maker.games = [];
    this._searchers = [];
  }

  startSearch(socket) {
    if (this._searchers.indexOf(socket.id) !== -1) {
      return;
    }

    this._searchers.push(socket.id);

    console.log(`${socket.handshake.query.name} added to queue, socket id: ${socket.id}`);

    this._tryCreateGame();
  }

  removeSearcher(socket) {
    this._searchers = this._searchers.filter(searcher => searcher !== socket.id);

    console.log(`${socket.handshake.query.name} removed from queue, socket id: ${socket.id}`);
  }

  _tryCreateGame() {
    if (this._searchers.length < 1) {
      return;
    }

    let playersPair = [];
    this._searchers.map(player => {
      playersPair.push(player);

      if (playersPair.length === 2) {
        const game = new Game(this.io, _.clone(playersPair));
        Maker.games.push(game);
        playersPair = [];
      }
    });
  }
}

module.exports = Maker;
