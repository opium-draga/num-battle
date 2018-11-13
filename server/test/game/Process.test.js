var app = require('../../src/server'),
  ioClient = require('socket.io-client'),
  Maker = require('../../src/game/Maker'),
  ioOptions = {transports: ['websocket'], forceNew: true};

afterAll(() => {
  app.server.close();
});

describe('Tasks creation', () => {
  let firstClient = ioClient('http://localhost:3000/?name=First client', ioOptions),
    secondClient = ioClient('http://localhost:3000/?name=Second client', ioOptions),
    activeGame;

  test('Test tasks creation', done => {
    firstClient.on('gameFound', res => {

      firstClient.emit('changePlayerStatus', true);
      secondClient.emit('changePlayerStatus', true);

      setTimeout(() => {
        activeGame = Maker.games.find(game => game.roomId === res.roomId);
        expect(activeGame.process).toBeDefined();
        expect(activeGame.process.tasks).toHaveLength(10);
        done();

      }, 50);
    });

    firstClient.emit('startSearch');
    secondClient.emit('startSearch');
  });
});
