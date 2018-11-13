const User = require('../user/User');

class Player extends User {
  constructor(socket) {
    super(socket);
    this.ready = false;

    /**
     * Task index -> True/False answer
     */
    this.tasksAnswers = [];
  }
}

module.exports = Player;

