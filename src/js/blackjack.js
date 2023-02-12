import { Table } from "./oopCards.js";

function main() {

    //main ui elements
    const dealButton = document.querySelector('.deal');
    const hitButton = document.querySelector('.hit');
    const stayButton = document.querySelector('.stay');
    const reDealButton = document.querySelector('.reDeal');
    const gameArea = document.querySelector(".gameArea");
    const playerScoreArea = document.querySelector('.scoreArea');
    const dealerHandHolder = document.querySelector('.dealerHand')
    const playerHandHolder = document.querySelector('.playerHand')
    const topHeader = document.querySelector('.headArea');

    let gameBoard;
    let player;
    let dealer;
    let playerScore;
    let dealerScore;
    let playerWins = 0;
    let dealerWins = 0;

    function blackjack() {
        gameArea.classList.remove('gameArea')
        gameArea.classList.add('hiddenArea');
        //start game and deal initial hand on click "deal"
        dealButton.addEventListener("click", deal);
        reDealButton.addEventListener("click", deal);
        //new card on click "hit"
        hitButton.addEventListener("click", () => {
            //give player another card & update UI
            gameBoard.newCard(player)
            //update player score
            playerScore = player.calcTotal();
            //check for win & lose conditions
            if (playerScore === 21) {
                hitButton.disabled = true;
                hitButton.classList.add('greyOut')
                stayButton.disabled = true;
                stayButton.classList.add('greyOut')
                reDealButton.classList.remove('hiddenArea')
                dealersTurn()
                playerScoreArea.innerHTML = 'Blackjack! -- ' + findWinner(player, dealer);
            }
            else if (playerScore > 21) {
                const dealerFlip = document.querySelector(".flipCard");
                dealerFlip.classList.remove("flipCard");
                hitButton.disabled = true;
                hitButton.classList.add('greyOut')
                stayButton.classList.add('greyOut')
                stayButton.disabled = true;
                reDealButton.classList.remove('hiddenArea')
                findWinner(player, dealer)
                playerScoreArea.innerHTML = `You bust with ${playerScore}! Dealer wins with ${dealer.calcTotal()}!`;
            } else {
                //display score
                playerScoreArea.innerHTML = `Your current score: ${playerScore}`;
            }
        })

        stayButton.addEventListener("click", () => {

            hitButton.disabled = true;
            hitButton.classList.add('greyOut')
            dealersTurn();
            let winner = findWinner(player, dealer);
            playerScoreArea.innerHTML = winner;
            reDealButton.classList.remove('hiddenArea')
        });
    }
    function deal() {
        topHeader.classList.add('hiddenArea')
        hitButton.disabled = false;
        stayButton.disabled = false;
        hitButton.classList.remove('greyOut')
        stayButton.classList.remove('winButton')
        stayButton.classList.remove('greyOut')
        playerHandHolder.innerHTML = ''
        dealerHandHolder.innerHTML = ''
        gameArea.classList.remove('hiddenArea')
        gameArea.classList.add('gameArea')
        reDealButton.classList.add('hiddenArea')
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
            playerScoreArea.innerHTML = 'Natural 21! You win!'
            hitButton.disabled = true;
            hitButton.classList.add('greyOut')
            stayButton.classList.add('greyOut')
            stayButton.disabled = true;
            reDealButton.classList.remove('hiddenArea')
            dealersTurn()
            playerWins += 1;
        } else {
            //display players score
            playerScoreArea.innerHTML = `Player current score: ${playerScore}`;
        };
        gameArea.scrollIntoView({ behavior: "smooth", block: "end" })
    }

    function findWinner(player1, player2) {
        stayButton.disabled = true;
        hitButton.disabled = true;
        let player1Score = player1.calcTotal()
        let player2Score = player2.calcTotal()
        hitButton.classList.add('greyOut')
        stayButton.classList.add('greyOut')
        if (player1Score > 21 && player2Score > 21) {
            return 'Both players bust';
        } else if (player1Score > 21) {
            playerWins += 1;
            return 'Dealer wins with: ' + player2Score + ' vs ' + player1Score;
        } else if (player2Score > 21) {
            dealerWins += 1;
            return 'Player 1 wins with: ' + player1Score + ' vs ' + player2Score;
        } else if (player1Score > player2Score) {
            playerWins += 1;
            return 'Player 1 wins with: ' + player1Score + ' vs ' + player2Score;
        } else if (player2Score > player1Score) {
            dealerWins += 1;
            return 'Dealer wins with: ' + player2Score + ' vs ' + player1Score;
        } else {
            return 'Tie';
        }
    }

    function dealersTurn() {
        console.log("dealers turn", dealer, dealer.calcTotal())
        //flip dealers first card
        const dealerFlip = document.querySelector(".flipCard");
        dealerFlip.classList.remove("flipCard");
        //dealers turn
        while (dealer.calcTotal() < 17 || dealer.calcTotal < player.calcTotal) {
            gameBoard.newCard(dealer)
        }
        console.log("dealers score: ", dealer.calcTotal())
    }

    blackjack();
};

export { main }

