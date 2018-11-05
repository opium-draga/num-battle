const {Guid} = require('../utils');
const Users = require('../user/Users');
const Player = require('./Player');


class Game {
  constructor(io, users) {
    this.io = io;
    this.users = users;
    this.players = [];

    this.roomId = Guid();
    this.ns = `/room-${this.roomId}`;
    this.nsIO = this.io.of(this.ns);

    this._emitRoomCreated();

    this._initListeners();
  }

  _initListeners() {
    this.nsIO.on('connect', socket => {
      this._addPlayer(socket);

      socket.on('changePlayerStatus', ready => this._changePlayerStatus(socket, ready));
      socket.on('disconnect', () => this._removePlayer(socket));
    });
  }

  _addPlayer(socket) {
    const user = Users.getById(socket.id);
    this.players.push(new Player(socket, user));
    console.log(`Player ${user.model.name} connected to Room ${this.roomId}`);
  }

  _removePlayer(socket) {
    this.players = this.players.filter(player => player.id === socket.id);
    if (!this.players.length) {
      this._destroyRoom();
    }
  }

  _destroyRoom() {
    Object.keys(this.nsIO).forEach(socketId => {
      this.nsIO.connected[socketId].disconnect();
    });
    this.nsIO.removeAllListeners();
    delete this.io.nsps[this.ns];
  }

  _changePlayerStatus(socket, status) {
    this.players.map(player => {
      if (player.id === socket.id) {
        player.ready = status;
      }
    });

    socket.broadcast.emit('updateCompetitorStatus', {status});

    if (this.players.every(player => player.ready)) {
      this._startGame();
    }
  }

  _startGame() {
    // TODO: start from here

    console.log('start game');
  }

  _emitRoomCreated() {
    this.users.map((userSocketId, index) => {
      const playerSocket = this.io.sockets.connected[userSocketId];

      playerSocket.emit('gameFound', {
        gameId: this.roomId,
        namespace: this.ns,
        current: Users.getById(userSocketId),
        competitor: Users.getById(this.users[+!index])
      });
    });
  }
}

module.exports = Game;
