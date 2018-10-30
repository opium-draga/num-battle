
class User {
  constructor(socket) {
    this.socketId = socket.id;

    if (!socket.handshake.query || !socket.handshake.query.name) {
      console.warn("New client doesn't have nickname!");
    } else {
      this.name = socket.handshake.query.name;
    }

    console.log(`New client: Socket id ${socket.id}, Name ${this.name}`);
  }

  get id() {
    return this.socketId;
  }
}

module.exports = User;
