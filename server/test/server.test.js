var app = require('../src/server'),
  ioClient = require('socket.io-client'),
  ioOptions = {transports: ['websocket'], forceNew: true, reconnection: false};

afterAll(() => {
  app.server.close();
});


describe('Establish connection', () => {
  let firstClient, secondClient;

  beforeAll(() => {
    firstClient = ioClient('http://localhost:3000/?name=First client', ioOptions);
  });

  afterAll(() => {
    firstClient.disconnect();
    secondClient.disconnect();
  });

  test('Client should receive online users', done => {
    secondClient = ioClient('http://localhost:3000/?name=Second client', ioOptions);

    secondClient.on('onlineUsers', res => {
      let users = res.users;
      expect(users.length).toBe(1);

      let user = users.pop();
      expect(user.name).toBe('First client');
      expect(user.socketId).toBe(firstClient.id);

      done();
    });
  });
});
