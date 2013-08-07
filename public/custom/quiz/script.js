/**************
Variables
***************/
var start_question = 1,
    yes_path,
    no_path,
    node_id;

/**************
Prepare the game
***************/
$(function() {

  // Ensures that forms do not refresh the page
  $('form').on('click', function() {
    return false;
  });

  // When the player is ready to play (ie. has thought of an animal), the game should move the hero unit and the ready button out of the way, and get the first question.
  $('#ready_button').bind('click', function() {
    $('.hero-unit').slideUp(500);
    $("#ready_button").hide();
    get_question(start_question);
  });

  // When the player clicks the "yes" button, check if there is a question on the yes_path. If there is, return the question, if not, the game has guessed the correct animal and will gloat about it.
  $('#yes_button').on('click', function() {
    if(yes_path){
      get_question(yes_path);
    } else {
      gloat();
    }
  });

  // When the player clicks on the "no" button, check if there is a question on the no_path. If there is, return the question, if not, ask the user about the animal they were thinking of.
  $('#no_button').on('click', function() {
    if(no_path){
      get_question(no_path);
    } else {
      show_new_question_form();
    }
  });

  // When the player has entered the information about the animal, the game will send it on to the database.
  $('#submit').on('click', function() {
    submit_new_animal_form();
  });
});


/**************
Returns the next question
***************/
// The game queries the database to find the next question.
var get_question = function get_question(question_id){
  var ask_url =
      "http://"+
      window.location.host +
      "/animalquiz/ask";

  /**************
  AJAX query to get the next question
  ***************/
  var question_string = $.ajax({
    type: "POST",
    url: ask_url,
    accepts: "application/json",
    dataType: "json",
    data: { 'id' : question_id },
    complete: function(data){
      $.each(data, function(index, element) {
        if(index == 'responseJSON'){
          node_id = element['id'];
          question = element['question'];
          yes_path = element['yes'];
          no_path = element['no'];
          $('.question_label').text(question);
          $('.question').css('display', 'block');
          $('.question a').show();
        }
      });
    }
  });
};

/**************
Creates a new question
***************/
// If the game has not guessed the user's animal, it would like to learn about it. It will hide the current_question form and display the new_question form.
var show_new_question_form = function show_new_question_form() {
  $('.question').css('display', 'none');
  $('.quiz_form').css('display', 'block');
};

// The game submits the information provided by the user.
var submit_new_animal_form = function submit_new_animal_form() {
  var question_url = "http://"+ window.location.host + "/animalquiz/learn";

  $.ajax({
    type: "POST",
    url: question_url,
    accepts: "application/json",
    dataType: "json",
    data: {
      'id' : node_id,
      'animal' : $('#animal').val(),
      'question' : $('#question').val(),
      'answer' : $('input:checked', '.quiz_form').val() },
    complete: function(data){
      console.log(data);
      // When the form is successfully submitted, it should ask the user to play again
      play_again();
      return false;
    }
  });

};

// The game will hide the option buttons, boast about its guessing prowess, and ask if the user would like to play again.
var gloat = function gloat() {
  $('.question a').hide();
  $('.question_label').text("I win!");
  play_again();
};

// The game and forms are reset and asks if the user would like to play again.
var play_again = function play_again() {
  $("#ready_button").show().appendTo('.container').text("Play Again?");
  $('.quiz_form').trigger("reset").css('display', 'none');
};
