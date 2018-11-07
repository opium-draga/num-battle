var app = require('../../src/server'),
  ioClient = require('socket.io-client'),
  ioOptions = {transports: ['websocket'], forceNew: true, reconnection: false};

afterAll(() => {
  app.server.close();
});

describe('Add, remove and online update', () => {
  let firstClient, secondClient;

  beforeEach(() => {
    firstClient = ioClient('http://localhost:3000/?name=First client', ioOptions);
    secondClient = ioClient('http://localhost:3000/?name=Second client', ioOptions);
  });

  afterEach(() => {
    firstClient.close();
    secondClient.close();
  });

  // it shouldn't be possible to get self in the users list
  test('Test adding user to online list', done => {
    secondClient.on('onlineUsers', res => {
      let users = res.users;
      expect(users).toBeDefined();
      expect(users.length).toBe(1);

      done();
    });
  });

  test('Test online user structure', done => {
    secondClient.on('onlineUsers', res => {
      let users = res.users;
      expect(users.length).toBe(1);

      let user = users.pop();
      expect(user.name).toBe('First client');
      expect(user.socketId).toBe(firstClient.id);

      done();
    });
  });

  test('Test removing user from online list', done => {
    firstClient.close();

    secondClient.on('onlineUsers', res => {
      let users = res.users;
      expect(users).toBeDefined();
      expect(users.length).toBe(0);

      done();
    });
  });
});