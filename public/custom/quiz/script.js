// quiz/script.js contains all the implementation logic for AnimalQuiz,  inspired by challenge #4 of Ruby Quiz. The script tracks the user interaction and uses ajax to communicate with the persistence layer.

/**************
Variables
***************/
var start_question_id = 1,
    yes_path,
    no_path,
    question_text,
    question_id;

/**************
Game Preparation
***************/
$(function() {
  // Setting the forms to return false ensures that the page is not refreshed on submit.
  $('form').on('click', function() {
    return false;
  });
  $('form').hide();

  // When the player is ready to play (ie. has thought of an animal), the game should move the hero unit and the ready button out of the way, and get the first question.
  $('#ready_button').bind('click', function() {
    $('.hero-unit').slideUp(500);
    $("#ready_button").hide();
    ask_question(start_question_id);
  });

  // When the player clicks the "yes" button, send the yes_path for processing
  $('#yes_button').on('click', function() {
    process_path(yes_path, 'yes');
  });

  // When the player clicks on the "no" button, send the no_path for processing
  $('#no_button').on('click', function() {
    process_path(no_path, 'no');
  });

  // When the player submits information about the animal, the game will send it on to the database.
  $('#submit').on('click', function() {
    submit_learn_animal_form();
  });
});

/**************
Game Play
***************/
// When the user chooses a path, first check if the path is defined. If the path is defined, return the question, if not, the game has either guessed the correct animal and will gloat about it, or it will ask for more information.
var process_path = function(path, path_name){
  if(path){
    ask_question(path);
  } else {
    if(path_name == 'yes'){
      game_over();
    } else {
      show_learn_animal_form();
    }
  }
};

// The game uses ajax to query the database for the next question. The game sends the id of the question it would like returned and forwards the response for further processing.
var ask_question = function ask_question(next_question){
  $.ajax({
    type: "POST",
    url: "http://"+ window.location.host + "/animalquiz/ask",
    dataType: "json",
    data: { 'id' : next_question },
    complete: function(data){
      process_json(data['responseJSON']);
    }
  });
};

// process_json() retrieves the interesting data from the json and update all the variables.
var process_json = function(json) {
  question_id = json['id'];
  question_text = json['question'];
  yes_path = json['yes'];
  no_path = json['no'];

  display_next_question(question_text);
};

// display_next_question() modifies and shows the question form and response buttons.
var display_next_question = function display_next_question(display_text) {
  $('.question_form h3').text(display_text);
  $('.question_form a').show();
  $('.question_form').show();
};

// If the game has not guessed the user's animal, it would like to learn about it. It will hide the current_question form and display the new_question form.
/**************
Game Learns
***************/
var show_learn_animal_form = function show_learn_animal_form() {
  $('.question_form').hide();
  $('.learn_animal_form').show();
};

// The game submits the information provided by the user.
var submit_learn_animal_form = function submit_learn_animal_form() {
  $.ajax({
    type: "POST",
    url: "http://"+ window.location.host + "/animalquiz/learn",
    accepts: "application/json",
    dataType: "json",
    data: {
      'id' : question_id,
      'animal' : $('#new_animal').val(),
      'question' : $('#new_question').val(),
      'answer' : $('input:checked', '.learn_animal_form').val() },
    complete: function(data){
      // When the form is successfully submitted, it asks the user to play again
      play_again();
      return false;
    }
  });
};

/**************
Game Over
***************/
// When it has guessed the animal correctly, the game will hide the option buttons, boast about its guessing prowess, and ask if the user would like to play again.
var game_over = function game_over() {
  $('.question_form h3').text("I win!");
  $('.question_form a').hide();
  play_again();
};

// The game and forms are reset and asks if the user would like to play again.
var play_again = function play_again() {
  $("#ready_button").show().appendTo('.container').text("Play Again?");
  $('.learn_animal_form').trigger("reset").hide();
};