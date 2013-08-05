/**************
Variables
***************/
var row = "<div class='row'></div>",
    square = "<i class='icon-stop square'></i>",
    victory = "<div class='alert alert-success'><h2>You Won!</h2></div>",
    gridSize = 5,
    allSquares;

/**************
Prepare game area
***************/
$(function () {

  /**************
  Make the game area and set the variables
  ***************/
  makeGrid(gridSize);
  allSquares = $('.square');
  setCenter(allSquares);

  /**************
  Resilient click handler ensures all squares are bound
  Colors the neighbours and checks for victory
  ***************/
  $('.container').on('click', '.square', function() {
    var mySquare = $(this);
    colorNeighbors(mySquare);
    checkVictory(allSquares);
  });

  /**************
  Reset game grid
  ***************/
  $('.reset').on('click', function() {
    setCenter(allSquares);
    $(victory).empty();
  });

  /**************
  for debugging
  ***************/
  // $('.fill').on('click', function() {
  //   allSquares.addClass('blue');
  // });
});

/**************
Create the game grid
***************/
var makeGrid = function(size) {
  /**************
  Make the rows
  ***************/
  for(var i=0; i<size; i++) {
    $(row).prependTo(".gameGrid");
  }

  /**************
  Add the squares
  ***************/
  $.each($('.row'), function(index, value) {
    for(var j=0; j<gridSize; j++) {
      $(square).appendTo($(this));
    }
  });
};

/**************
Color the neighbors
***************/
var colorNeighbors = function(squareX) {
  // toggle the blue class of the clicked square
  squareX.toggleClass('blue');

  // toggle the class of the nextdoor neighbors
  squareX.next().toggleClass('blue');
  squareX.prev().toggleClass('blue');

  //get current square index
  var myIndex = squareX.index('.square');

  // add the gridsize and toggle class
  $(allSquares[myIndex + gridSize]).toggleClass('blue');

  // subtract the gridsize and toggle class
  $(allSquares[myIndex - gridSize]).toggleClass('blue');
};

/**************
Set the center square to blue
***************/
var setCenter = function(squares) {
  var center = Math.floor(squares.length / 2);
  squares.removeClass('blue');
  $(squares[center]).addClass('blue');
};

/**************
Check for victory (if all squares are blue)
***************/
var checkVictory = function checkVictory(squares) {
  if (squares.length === $('.blue').length) {
    $(victory).prependTo('.game_area');
  }
};