var secret,
    guess,
    mark,
    game;

$(function() {
  var form = $('form');
  form.hide();

  form.on('click', function() {
    return false;
  });

  form.validate({
      rules: {
        guess_text: {
          maxlength: 5,
          minlength: 5
        }
      },
      highlight: function(element) {
        $(element).closest('.control-group').removeClass('success').addClass('error');
      },
      success: function(element) {
        element
        .text('OK!').addClass('valid')
        .closest('.control-group').removeClass('error').addClass('success');
      }
    });

  $('.btn-primary').bind('click', function() {
    form.show();
    game = new Game();
    build_html("Guess", "Mark");
  });

  $('#guess').bind('click', function() {
    var user_guess = $('#guess_text').val();
    var output_mark = game.guess(user_guess);

    if (output_mark == "+++++"){
      build_html("ZOMG", "YAY");
      $('#secret').text(game.secret);
    } else {
      build_html(user_guess, output_mark);
    }
  });
});

var build_html = function(input_string, output_string) {
  html = '';
  html += "<div class='row'><div class='span6 guess'><p>";
  html += input_string;
  html += "</p></div><div class='span6 mark'><p>";
  html += output_string;
  html += "</p></div></div>";

  $(html).appendTo('.guess_row');
};

function Game(start_code) {
  if(typeof start_code === 'undefined') {
    this.secret = codeGen();
  } else {
    this.secret = start_code;
  }
  this.guess = function guess(guess_string){
    if(guess_string.length > 5 || guess_string.length < 5){
      throw new Error("Not a valid guess");
    }
    return mark(this.secret, guess_string);
  };
}

var codeGen = function codeGen() {
  // TODO write logic for code generator
  return '12345';
};

var mark = function mark(secret_code, guess_string){
  secret = secret_code.split('');
  guess = guess_string.split('');
  mark_string = '';
  for(var i = 0; i < guess.length; i++){
    if (secret[i] == guess[i]) {
      mark_string += "+";
      secret[i] = 'x';
    } else {
      if (secret.indexOf(guess[i]) > -1) {
        var location = secret.indexOf(guess[i]);
        if (secret[location] != guess[location]) {
          mark_string += "-";
          secret[location] = 'x';
        }
      }
    }
  }
  return mark_string.split('').sort().join('');
};






