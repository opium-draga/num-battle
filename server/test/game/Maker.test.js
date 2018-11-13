var app = require('../../src/server'),
  ioClient = require('socket.io-client'),
  ioOptions = {transports: ['websocket'], forceNew: true};

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
