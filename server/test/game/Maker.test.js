var app = require('../../src/server'),
  ioClient = require('socket.io-client'),
  Maker = require('../../src/game/Maker'),
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

describe('Find, create and start game', () => {
  let firstClient = ioClient('http://localhost:3000/?name=First client', ioOptions),
    secondClient = ioClient('http://localhost:3000/?name=Second client', ioOptions),
    roomId,
    activeGame;

  test('Test create Game', done => {
    setTimeout(() => {
      firstClient.emit('startSearch');
      secondClient.emit('startSearch');
    }, 100);

    firstClient.on('gameFound', res => {
      expect(res).toBeDefined();
      expect(typeof res.roomId).toBe('string');
      expect(res.competitor.socketId).toBe(secondClient.id);

      // check if Game can be found by roomId
      activeGame = Maker.games.find(game => game.roomId === res.roomId);
      expect(activeGame.roomId).toBe(res.roomId);
      expect(activeGame.players.length).toBe(2);

      roomId = res.roomId;

      done();
    });
  });

  test('Test change player status', done => {
    secondClient.on('updateCompetitorStatus', res => {
      expect(res).toBeDefined();
      expect(res.status).toBeTruthy();
      done();
    });

    firstClient.emit('changePlayerStatus', true);
  });

  test('Test start game', done => {
    firstClient.emit('changePlayerStatus', true);
    secondClient.emit('changePlayerStatus', true);

    setTimeout(() => {
      activeGame.players.forEach(player => {
        expect(player.ready).toBeTruthy();
      });

      done();
    }, 100);
  });
});
