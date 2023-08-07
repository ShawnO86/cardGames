# JavaScript Blackjack 21
=======
### Technologies Used 

* JavaScript (ES6)
* SASS
* Webpack

### Structure 

To create this project, I used object-oriented programming principles to structure the codebase. 

* The Player class represents a player in the game and contains the methods for drawing and calculating values of cards for scoring the hand.
* The Card class represents a single card and contains the constructors for suit and rank.
* The Deck class represents all the cards in an array. It contains the constructor and methods for shuffling and dealing.
* The Table class represents the board and holds the constructor for the remaining cards in the deck and the players(player, dealer). It also contains the methods for starting the game loop using the other classes, labeling the suits of cards with an HTML entity (&#9824; &#9827; &#9830; &#9829;), and updating the UI with cards on the board. 
