$(function () {
  var row = "<div class='row'></div>",
      square = "<div class='span4 square'></div>",
      victory = "<div class='victory'>You won!</div>",
      gridSize = 5;

  // make the grid
    // make the rows
    for(var i=0; i<gridSize; i++) {
      $(row).prependTo(".gameGrid");
    }

    // make the squares
    $.each($('.row'), function(index, value) {
      for(var j=0; j<gridSize; j++) {
        $(square).appendTo($(this));
      }
    });

  var allSquares = $('.square');

  // set the center square to blue
  var setCenter = function(squares) {
    var center = Math.floor(squares.length / 2);
    allSquares.removeClass('blue');
    $(squares[center]).addClass('blue');
  };

  setCenter(allSquares);

  $('.container').on('click', '.square', function() {
    var mySquare = $(this);

    // toggle the blue class of the clicked square
    mySquare.toggleClass('blue');

    // toggle the class of the next door neighbours
    mySquare.next().toggleClass('blue');
    mySquare.prev().toggleClass('blue');
      //get current square index
    var myIndex = mySquare.index('div.square');
      // add the gridsize and toggle class
    $(allSquares[myIndex + gridSize]).toggleClass('blue');
      // subtract the gridsize and toggle class
    $(allSquares[myIndex - gridSize]).toggleClass('blue');

    // check to see if all squares are blue
    if (allSquares.length === $('.blue').length) {
      // show victory sign
      $(victory).prependTo(".container");
    }

  });

  $('#reset').on('click', function() {
    setCenter(allSquares);
    $(victory).empty();
  });
});