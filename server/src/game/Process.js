const NumTask = require('./tasks/NumTask');

class Process {
  constructor(io, players) {
    this.io = io;
    this.players = players;

    this.tasks = [];
  }

  run() {
    this._generateTasks(10);
  }

  // TODO: should be factory for generation tasks based on type
  _generateTasks(amount) {
    if (amount < 0) {
      return;
    }

    let itemPercent = 100 / amount;
    for (let i = 1; i <= amount; i++) {
      this.tasks.push(new NumTask(itemPercent * i));
    }
  }

}

module.exports = Process;
