
class User {
  constructor(socket, model) {
    this.socket = socket;
    this.model = model;
  }

  get id() {
    return this.socket.id;
  }
}

module.exports = User;
