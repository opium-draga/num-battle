const {Guid} = require('../utils');
const Users = require('../user/Users');
const Player = require('./Player');
const Process = require('./Process');

class Game {
  constructor(io, playersSocketIds) {
    this.io = io;
    this.playersSocketIds = playersSocketIds;
    this.players = [];
    this.roomId = Guid();
    this.isStarted = false;

    this.process = null;

    console.log(`Game created!`);

    this._attachUserToRoom();
  }

  _initListeners(socket) {
    this.players.push(new Player(socket, this.roomId));

    socket.on('changePlayerStatus', ready => this._changePlayerStatus(socket, ready));
  }

  _changePlayerStatus(socket, status) {
    this.players.map(player => {
      if (player.id === socket.id) {
        player.ready = status;
      }
    });

    socket.to(this.roomId).emit('updateCompetitorStatus', {status});

    this._startGame();
  }

  _startGame() {
    if (this.players.some(player => !player.ready)) {
      console.log('Not all players are ready');
      return;
    }

    this.isStarted = true;

    this.process = new Process(this.io, this.players);
    this.process.run();

    console.log('Game is started!');
  }

  _attachUserToRoom() {
    this.playersSocketIds.forEach((playerSocketId, index) => {
      const playerSocket = this.io.sockets.connected[playerSocketId];

      playerSocket.join(this.roomId);
      this._initListeners(playerSocket);

      playerSocket.emit('gameFound', {
        roomId: this.roomId,
        competitor: Users.getById(this.playersSocketIds[+!index])
      });
    });
  }
}

module.exports = Game;
