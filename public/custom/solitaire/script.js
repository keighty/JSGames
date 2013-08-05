var row = "<div class='row'></div>",
    square = "<i class='icon-stop square'></i>",
    victory = "<div class='victory'>You won!</div>",
    gridSize = 5,
    allSquares;



$(function () {
  makeGrid(gridSize);
  allSquares = $('.square');
  setCenter(allSquares);

  $('.container').on('click', '.square', function() {
    var mySquare = $(this);
    colorNeighbors(mySquare);

    checkVictory(allSquares);

  });

  $('.reset').on('click', function() {
    setCenter(allSquares);
    $(victory).empty();
  });
});

// make the game grid
var makeGrid = function(size) {
  // make the rows
  for(var i=0; i<size; i++) {
    $(row).prependTo(".gameGrid");
  }

  // make the squares
  $.each($('.row'), function(index, value) {
    for(var j=0; j<gridSize; j++) {
      $(square).appendTo($(this));
    }
  });
};

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

}

// set the center square to blue
var setCenter = function(squares) {
  var center = Math.floor(squares.length / 2);
  squares.removeClass('blue');
  $(squares[center]).addClass('blue');
};

// check for victory
var checkVictory = function checkVictory(squares) {
  // check to see if all squares are blue
  if (squares.length === $('.blue').length) {
    // show victory sign
    $(victory).prependTo(".container");
  }
};