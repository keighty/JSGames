var game;
describe( "Mastermind", function () {
  beforeEach(function() {
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
    it( "is only 5 digits", function () {
      expect(function() { game.guess('111111'); }).toThrow(new Error("Not a valid guess"));
    });
    it( "is at least 5 digits", function () {
      expect(function() { game.guess('11'); }).toThrow(new Error("Not a valid guess"));
    });
    it( "sends '' with no matches", function () {
      expect(game.guess('66666')).toEqual('');
    });
    it( "sends '+' with one exact match", function () {
      expect(game.guess('16666')).toEqual('+');
    });
    it( "sends '-' with one number match", function () {
      expect(game.guess('26666')).toEqual('-');
    });
    it( "sends '--' with two number matches", function () {
      expect(game.guess('21666')).toEqual('--');
    });
    it( "sends '++' with two exact matches", function () {
      expect(game.guess('12666')).toEqual('++');
    });
    it( "sends '+-' with one exact and one number match", function () {
      expect(game.guess('16662')).toEqual('+-');
    });
    it( "sends '+-' with one number match and one exact match", function () {
      expect(game.guess('61366')).toEqual('+-');
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