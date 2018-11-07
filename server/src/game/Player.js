const User = require('../user/User');

class Player extends User {
  constructor(socket) {
    super(socket);
    this.ready = false;
  }
}

module.exports = Player;

