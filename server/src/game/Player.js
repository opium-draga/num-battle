const User = require('../user/User');

class Player extends User {
  constructor(socket, roomId) {
    super(socket);
    this.ready = false;
    this.roomId = roomId;
    this.tasksAnswers = [];
  }

  /**
   * @param answer Contains player correctAnswer for single task
   * @param answer {{index:number, correctAnswer: string, isAnswerCorrect: boolean, playerAnswer: string}}
   */
  markAnswer(answer) {
    this.tasksAnswers[answer.index] = answer;
  }
}

module.exports = Player;

