# cardGames

This is a work in progress.

Currently, the application will create a 52 card deck as an array and deal seven cards from it for two players.

Each card in the deck array is an object representing each {suit, face}.
Every card dealt is removed from the deck array and pushed to a hand array.

For each suit there are icons associated with them. The icons are the HTML entities for the related suit: &#9824; &#9827; &#9830; &#9829;

After the hand array is built it is rendered to the browser with a look of actual playing cards. 

The 5 has 5 icons 10 has 10 icons ect... Face cards are represented by their first letter A, K, Q, J.

As new cards are added to the hand an animation will play that shows the new card entering.

Most of the data is handled using objects of custom classes, which include:

Card{suit, face}

&#8595;

Deck{cards[]}

&#8595;

Player{playerName, playerCards[]}

&#8595;

Table{players[], deck[]}

To Do:

-Add face card (King, Queen & Jack) images.

-Add a win animation.

-???

____________________________________


--To get it working on your machine:

--install package: npm i

--build: npm run build

--dev server: npm run dev

