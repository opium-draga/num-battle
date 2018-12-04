const Task = require('./Task');

class NumTask extends Task {
  // TODO: implement algorithm for tasks generation
  _generate() {
    if (this.complexity <= 49) {
      this.question = "2 + 2 * 2";
      this.correctAnswer = "6";
    } else {
      this.question = "13 + 10 * 5";
      this.correctAnswer = "63";
    }
  }
}

module.exports = NumTask;
