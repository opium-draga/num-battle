var app = require('../../src/server'),
  ioClient = require('socket.io-client'),
  ioOptions = {transports: ['websocket'], forceNew: true};

afterAll(() => {
  app.server.close();
});

describe('Player actions', () => {
  let firstClient = ioClient('http://localhost:3000/?name=First client', ioOptions),
    secondClient = ioClient('http://localhost:3000/?name=Second client', ioOptions);

  test('Test player answer and progress update', done => {
    firstClient.on('gameFound', res => {

      firstClient.emit('changePlayerStatus', true);
      secondClient.emit('changePlayerStatus', true);

      setTimeout(() => {
        firstClient.emit('markAnswer', {index: 0, playerAnswer: "666"});
      }, 50);

      secondClient.on('updateProcess', res => {
        expect(res).toBeDefined();
        expect(res[firstClient.id].length).toBe(1);

        done();
      });

    });

    firstClient.emit('startSearch');
    secondClient.emit('startSearch');
  });
});