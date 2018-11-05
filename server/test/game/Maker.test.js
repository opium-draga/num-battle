var app = require('../../src/server'),
  ioClient = require('socket.io-client'),
  ioOptions = {transports: ['websocket'], forceNew: true, reconnection: false};

afterAll(() => {
  app.server.close();
});

describe('Add and remove user from queue', () => {
  let client = ioClient('http://localhost:3000/?name=Client', ioOptions);

  test('Test add user to queue', done => {
    client.emit('startSearch');

    setTimeout(() => {
      expect(app.Maker._searchers.indexOf(client.id)).toBe(0);
      done();
    }, 100);
  });

  test('Test remove user from queue', done => {
    client.close();

    setTimeout(() => {
      expect(app.Maker._searchers.indexOf(client.id)).toBe(-1);
      done();
    }, 50);
  });
});


describe('Find and create Game', () => {
  let firstClient = ioClient('http://localhost:3000/?name=First client', ioOptions),
    secondClient = ioClient('http://localhost:3000/?name=Second client', ioOptions);

  test('Test create Game', done => {
    setTimeout(() => {
      firstClient.emit('startSearch');
      secondClient.emit('startSearch');
    }, 100);

    firstClient.on('gameFound', res => {
      expect(res).toBeDefined();
      expect(typeof res.gameId).toBe('string');
      expect(res.namespace).toBe(`/room-${res.gameId}`);
      expect(res.current.socketId).toBe(firstClient.id);
      expect(res.competitor.socketId).toBe(secondClient.id);

      done();
    });

    //TODO: test creating of namespace
  });
});