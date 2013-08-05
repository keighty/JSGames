#JSGames [![Build Status](https://travis-ci.org/keighty/JSGames.png?branch=master)](https://travis-ci.org/keighty/JSGames)[![Code Climate](https://codeclimate.com/github/keighty/JSGames.png)](https://codeclimate.com/github/keighty/JSGames)

##Solitaire
###Object
Clicking a square toggles it blue, as well as its neighbours
 in all directions. The game begins with a blue center square.
  The game is over when you have successfully turned all the
   squares blue.

###Background
Solitare was built using the bootstrap framework and jQuery.

With the exception of the header, all html elements on the
 page are added using jQuery.

A resilient onClick handler is used to bind clicks to all squares at once.

##Mastermind
###Object
Guess the five digit secret code in twenty guesses or fewer.

###Background
Mastermind is adapted from Codebreaker, an RSpec teaching tool. It is expanded and modified to include ruby, javascript, sinatra, and bootstrap

##Animal Quiz
###Object
Help Ruby learn more about animals but playing a simple guessing game. If Ruby guesses your animal, the game is over, but if she doesn't, help her learn a new animal.

###Background
This is a project inspired by The Best of Ruby Quiz. I implemented it as a binary search tree first, but then decided to practice some active record and created a database interaction.