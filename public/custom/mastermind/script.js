var secret,
    guess,
    mark,
    game,
    form,
    counter = 0;

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

  // processes the guess and increments guess counter
  $('#guess').bind('click', function() {
    var user_guess = $('#guess_text').val();
    $('#guess_text').val("");
    counter += 1;
    game.guess(user_guess);
  });

  // creates an entry in the highscore table
  // redirects to highscore page
  $('#submit_score').bind('click', function() {
    // submit the name for high score
    var name = $('#highscore_name').val();
    var high_score_url = "http://" + window.location.host + "/highscore/" + name;
    var visit_high_scores = "http://" + window.location.host + "/highscores";

    console.log(name);
    console.log(high_score_url);
    console.log(counter);

    var high_score = $.ajax({
      type: "POST",
      url: high_score_url,
      accepts: "application/json",
      dataType: "json",
      data: {
        'game'  : "mastermind",
        'score' : counter },
      complete: function(data){
        window.location.href = visit_high_scores;
      }
    });
    $('#high_score_form').trigger('close');
  });
});

var prep_game_board = function prep_game_board() {
  // TODO vanish hero unit but keep button

  $('.guess_additions').remove();
  $('.game_outline').show();
  $('#highscore_name').val("");
  counter = 0;

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
  var the_url = "http://" + window.location.host + "/mastermind/game/" + guess_string;
  var mark_string = $.ajax({
    type: "POST",
    url: the_url,

    accepts: "application/json",
    dataType: "json",

    data: { 'code' : secret_code },
    complete: function(data){
      var output_mark = data['responseText'];
      process_output(secret_code, guess_string, output_mark);
    }
  });
};

// builds the guess display
// checks the analyzed guess for a win
var process_output = function process_output(secret, guess, output) {
  build_guess_html(guess, output);
  if (output == "+++++"){
    form.hide();
    build_alert_html("success");
    // change the score display
    $('#score_title').text("You won in " + counter + " moves");
    // make the lighbox visible
    $('#high_score_form').lightbox_me({
      centered: true,
      onLoad: function() {
        $('#high_score_form').find('input:first').focus();
        }
      });
    e.preventDefault();
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