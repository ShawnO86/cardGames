# cardGames

This is a work in progress.

Currently, the application will create a 52 card deck as an array and deal seven cards from it for two players.

Each card in the deck array is an object representing each {suit, face}.
Every card dealt is removed from the deck array and pushed to a hand array.

For each suit there are icons associated with them. The icons are the HTML entities for the related suit: &#9824; &#9827; &#9830; &#9829;

After the hand array is built it is rendered to the browser with a look of actual playing cards. 

The 5 has 5 icons 10 has 10 icons ect... Face cards are represented by their first letter A, K, Q, J.

Each card in the hand array is able to be traded out for another in the deck array with the click of a button. As they are traded out, they are swaped from hand array to deck array and vise versa using .splice() and .push().

As the cards are switched out an animation will play that shows the removed card leaving the hand and the new card entering.

To Do:
-Add face card images.

-Hide dealer cards.

-Create scoring system.

-Add a win animation.

