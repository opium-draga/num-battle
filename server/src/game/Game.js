const {Guid} = require('../utils');
const Users = require('../user/Users');
const Player = require('./Player');

class Game {
  constructor(io, users) {
    this.io = io;
    this.users = users;
    this.players = [];
    this.roomId = Guid();

    this._attachUserToRoom();
  }

  _initPlayerListeners(socket) {
    this.players.push(new Player(socket));

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

    // TODO: here should be Game process
    console.log('start game!!!!!!!!!!!!!!');
  }

  _attachUserToRoom() {
    this.users.map((userSocketId, index) => {
      const playerSocket = this.io.sockets.connected[userSocketId];

      playerSocket.join(this.roomId);
      this._initPlayerListeners(playerSocket);

      playerSocket.emit('gameFound', {
        roomId: this.roomId,
        competitor: Users.getById(this.users[+!index])
      });
    });
  }
}

module.exports = Game;
