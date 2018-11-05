const Game = require('./Game');
const _ = require('lodash');

class Maker {
  constructor(io) {
    this.io = io;

    Maker.games = [];

    /**
     * @type {Array} with Socket id of Users
     * @private
     */
    this._searchers = [];
  }

  startSearch(socket) {
    if (this._searchers.indexOf(socket.id) !== -1) {
      return;
    }

    this._searchers.push(socket.id);
    this._tryCreateGame();
  }

  stopSearch(socket) {
    let index = this._searchers.indexOf(socket.id);
    if (index !== -1) {
      this._searchers.splice(index, 1);
    }

    console.log('stopSearch Update queue: ' + this._searchers.length);
  }

  removeSearcher(socket) {
    this._searchers = this._searchers.filter(searcher => searcher !== socket.id);
  }

  _tryCreateGame() {
    if (this._searchers.length < 1) {
      return;
    }

    let playersPair = [];
    this._searchers.map(player => {
      playersPair.push(player);

      if (playersPair.length === 2) {
        const game = new Game(this.io, _.cloneDeep(playersPair));
        Maker.games.push(game);
        playersPair = [];
        console.log(`Room with id ${game.roomId} is created!`);
      }
    });
  }
}

module.exports = Maker;
