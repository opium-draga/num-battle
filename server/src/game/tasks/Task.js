class Task {
  constructor(complexity) {
    /**
     * Value from 0 to 100
     * @type {number}
     */
    this.complexity = complexity || 0;
    this.question = '';
    this.correctAnswer = '';

    this._generate();
  }

  _generate() {
    console.warn('Task _generate method is not implemented in child');
  }
}

module.exports = Task;
