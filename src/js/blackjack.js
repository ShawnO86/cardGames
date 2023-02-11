import { Table } from "./oopCards.js";

function blackjack() {
    //main ui elements
    const dealButton = document.querySelector('.deal');
    const hitButton = document.querySelector('.hit');
    const stayButton = document.querySelector('.stay');
    const gameArea = document.querySelector(".gameArea");
    const playerArea = document.querySelector(".playerArea");
    const dealerArea = document.querySelector(".dealerArea");
    const playerScoreArea = document.createElement('p');
    const dealerHandHolder = document.querySelector('.dealerHand')
    const playerHandHolder = document.querySelector('.playerHand')
    const topHeader = document.getElementById('topHeader');
    gameArea.classList.remove('gameArea')
    gameArea.classList.add('hiddenArea');
    playerScoreArea.classList.add('scoreArea')
    playerArea.appendChild(playerScoreArea)
    //main app scoped variables
    let gameBoard;
    let player;
    let dealer;
    let playerScore;
    let dealerScore;

    //start game and deal initial hand on click "deal"
    dealButton.addEventListener("click", () => {
        function deal() {
            hitButton.disabled = false;
            hitButton.classList.remove('greyOut')
            stayButton.classList.remove('winButton')
            stayButton.classList.remove('greyOut')
            playerHandHolder.innerHTML = ''
            dealerHandHolder.innerHTML = ''
            gameArea.classList.remove('hiddenArea')
            gameArea.classList.add('gameArea')
            gameBoard = new Table();
            //starting match
            gameBoard.start('Player', 'Dealer', 2);
            player = gameBoard.players[0];
            dealer = gameBoard.players[1];
            //calculate scores
            playerScore = player.calcTotal();
            dealerScore = dealer.calcTotal();
            console.log(player.playerName + " hand score: " + playerScore);
            console.log(dealer.playerName + " hand score: " + dealerScore);
            //player score win condition - natural 21
            if (playerScore === 21 && dealerScore < 21) {
                playerScoreArea.innerHTML = 'Natural 21!'
                hitButton.disabled = true;
                hitButton.classList.add('greyOut')
                stayButton.classList.add('winButton')
            } else {
                //display players score
                playerScoreArea.innerHTML = `Your current score: ${playerScore}`;
            };
                gameArea.scrollIntoView({behavior: "smooth", block: "start"})
        }
        deal()

    });

    //new card on click "hit"
    hitButton.addEventListener("click", () => {
        //give player another card & update UI
        gameBoard.newCard(player)
        //update player score
        playerScore = player.calcTotal();
        //win & lose conditions
        if (playerScore === 21) {
            playerScoreArea.innerHTML = 'Blackjack 21!';
            hitButton.disabled = true;
            hitButton.classList.add('greyOut')
            stayButton.classList.add('winButton')
        }
        else if (playerScore > 21) {
            playerScoreArea.innerHTML = `${playerScore} You bust! Dealer wins.`;
            hitButton.disabled = true;
            hitButton.classList.add('greyOut')
            stayButton.classList.add('greyOut')
        } else {
            //display score
            playerScoreArea.innerHTML = `Your current score: ${playerScore}`;
        }
    })
};



export {blackjack}

