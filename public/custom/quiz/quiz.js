$(function() {
  $('#ready').bind('click', function() {
    load_question();
  });
});

var load_question = function load_question(){
  var start_url = "http://" + window.location.host + "/animalquiz/start/";
  var mark_string = $.ajax({
    type: "GET",
    url: start_url,
    accepts: "application/json",
    dataType: "json",
    complete: function(data){

    }
  });
};

var make_entry = function make_entry(question){
};