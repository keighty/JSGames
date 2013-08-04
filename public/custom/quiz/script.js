/**************
Variables
***************/
var root = 1,
    yes,
    no,
    node_id;

/**************
Prepares the game
***************/
$(function() {

  form = $('form');
  form.on('click', function() {
    return false;
  });

  $('#ready').bind('click', function() {
    //hide the header
    $('.hero-unit').slideUp(500);
    // hide the button
    $("#ready").hide();
    //get the question
    get_question(root);
  });

  $('#yes').on('click', function() {
    if(yes){
      get_question(yes);
    } else {
      $('.question_label').text("I win!");
      //hide the buttons
      $('.question a').hide();
      yes = root;
      play_again();
    }
  });

  $('#no').on('click', function() {
    if(no){
      get_question(no);
    } else {
      show_new_question_form();
    }
  });

  //submit the query
  $('#submit').on('click', function() {
    var question_url =
        "http://"+
        window.location.host +
        "/animalquiz/wrong";

    /**************
    make question query
    ***************/
    var question_string = $.ajax({
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
        console.log("success");
        //hide the form
        $('.quiz_form').trigger("reset");
        $('.quiz_form').css('display', 'none');
        play_again();
        return false;
      }
    });
  });
});


/**************
Returns the next question
***************/
var get_question = function get_question(question_id){
  var answer_url =
      "http://"+
      window.location.host +
      "/animalquiz/start";

  /**************
  gets question string
  ***************/
  var question_string = $.ajax({
    type: "POST",
    url: answer_url,
    accepts: "application/json",
    dataType: "json",
    data: { 'id' : question_id },
    complete: function(data){
      $.each(data, function(index, element) {
        if(index == 'responseJSON'){
          node_id = element['id'];
          question = element['question'];
          yes = element['yes'];
          no = element['no'];
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
var show_new_question_form = function show_new_question_form() {
  //show the form
  $('.quiz_form').css('display', 'block');
  //hide the question
  $('.question').css('display', 'none');
};

var play_again = function play_again() {
  //play again?
  $("#ready").show().appendTo('.container').text("Play Again?");
};