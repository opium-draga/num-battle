const NumTask = require('./tasks/NumTask');

class Process {
  constructor(io, players) {
    this.io = io;
    this.players = players;
    this.tasks = [];
  }

  run() {
    this._generateTasks(10);
    this._initListeners();
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

  _initListeners() {
    this.players.forEach(player => {
      const socket = this.io.sockets.sockets[player.id];

      socket.on('markAnswer', req => {
        let answer = this._handleAnswer(req);
        if (answer) {
          player.markAnswer(answer);
          this._updateProcess();
        }
      });
    });
  }

  _handleAnswer(req) {
    if (!req || req.index === undefined || req.playerAnswer === undefined) {
      console.log('Answer object is not correct:', req);
      return false;
    }

    let correctAnswer = req.correctAnswer = this.tasks[req.index].correctAnswer;
    req.isAnswerCorrect = correctAnswer === req.playerAnswer;

    return req;
  }

  _updateProcess() {
    let playersAnswers = {};
    this.players.forEach(player => {
      playersAnswers[player.id] = player.tasksAnswers;
    });

    this.io.in(this.players[0].roomId).emit('updateProcess', playersAnswers);
  }
}

module.exports = Process;
