
class Player {
  constructor(nsSocket, user) {
    this.user = user;
    this.nsSocket = nsSocket;
    this.ready = false;
  }

  get id() {
    return this.nsSocket.id;
  }
}

module.exports = Player;

