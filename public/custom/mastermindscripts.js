var secret,
    guess,
    mark,
    game,
    form;

$(function() {
  form = $('form');
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
    game = new Game();
    prep_game_board();
  });

  $('#guess').bind('click', function() {
    var user_guess = $('#guess_text').val();
    $('#guess_text').val("");
    game.guess(user_guess);
  });
});

var prep_game_board = function prep_game_board() {
  $('.guess_additions').remove();
  $('.game_outline').show();
  console.log(game.secret);
};

// Game object
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
    mark(this.secret, guess_string);
  };
}

var codeGen = function codeGen() {
  return (""+Math.random()).substring(2,7);
};

// uses ajax to call ruby
var mark = function mark(secret_code, guess_string){
  var the_url = "http://" + window.location.host + "/game/" + guess_string;
  var mark_string = $.ajax({
    type: "POST",
    url: the_url,

    accepts: "application/json",
    dataType: "json",

    data: { 'code' : secret_code },
    complete: function(data){
      output_mark = data['responseText'];
      process_output(secret_code, guess_string, output_mark);
    }
  });
};

var process_output = function process_output(secret, guess, output) {
  build_guess_html(guess, output);
  if (output == "+++++"){
    form.hide();
    build_alert_html("success");
  }
};

var build_guess_html = function(input_string, output_string) {
  html = '';
  html += "<div class='row guess_additions'><div class='span6 guess'><p>";
  html += input_string;
  html += "</p></div><div class='span6 mark'><p>";
  html += output_string;
  html += "</p></div></div>";

  $(html).prependTo('.guess_row');
};

var build_alert_html = function(alert_type) {
  var success_string = "<div class='span6 offset2 guess_additions alert alert-" + alert_type + "'><p>You guessed the secret!</p></div>";
  $(success_string).prependTo('.game_area');
};