var secret,
    guess,
    mark,
    game,
    form,
    counter = 0,
    success_div;

$(function() {
  form = $('form');
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
  form.show();
  $('.secret_code').text("XXXXX");
  $('.guess_row').children().remove();
  $('.alert').remove();
  // console.log(game.secret);
  build_guess_html("Guess", "Mark");
};

var validate_guess = function validate_guess(user_guess) {
  var output_mark = game.guess(user_guess);

};

var build_guess_html = function(input_string, output_string) {
  html = '';
  html += "<div class='row'><div class='span6 guess'><p>";
  html += input_string;
  html += "</p></div><div class='span6 mark'><p>";
  html += output_string;
  html += "</p></div></div>";

  $(html).appendTo('.guess_row');
};

var build_alert_html = function(alert_type) {
  var success_string = "<div class='span6 offset2 alert alert-" + alert_type + "'><p>You guessed the secret! Play again?</p></div>";
  $(success_string).prependTo('.game_area');
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
    mark(this.secret, guess_string);
  };
}

var codeGen = function codeGen() {
  return (""+Math.random()).substring(2,7);
};

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
    $('.secret_code').text(secret);
  }
};