var game;

describe( "Mastermind", function () {
  beforeEach(function() {
    jasmine.getFixtures().fixturesPath = '../spec/fixtures';
    loadFixtures('mastermind/_form.html');
    game = new Game('12345');
  });
  it( "starts a game", function () {
    expect(game.secret).toEqual('12345');
  });
  it( "responds to guess", function () {
    var gameSpy = spyOn(game, 'guess');
    game.guess('12345');
    expect(gameSpy).toHaveBeenCalled();
  });
  describe( "Guess", function () {
    beforeEach(function() {
      jasmine.getFixtures().fixturesPath = '../spec/fixtures';
      loadFixtures('mastermind/_guess.html');
    });
    it( "is only 5 digits", function () {
      expect(function() { game.guess('111111'); }).toThrow(new Error("Not a valid guess"));
    });
    it( "is at least 5 digits", function () {
      expect(function() { game.guess('11'); }).toThrow(new Error("Not a valid guess"));
    });
  });
  describe( "Code", function () {
    it( "is 5 digits", function () {
      game = new Game();
      expect(game.secret.length).toEqual(5);
    });
    it( "is random", function () {
      game1 = new Game();
      game2 = new Game();
      expect(game1.secret).not.toEqual(game2.secret);
    });
  });
});

// TODO write jasmine tests for Solitaire
describe( "Solitaire", function () {
  it( "loads a game board", function () {

  });
  xit( "sets the center square blue", function () {

  });
});