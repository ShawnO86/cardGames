class Card {
    constructor(suit, rank) {
        this.suit = suit;
        this.rank = rank;
    }
}

class Deck {
    constructor() {
        this.cards = [];
    };

    //builds a standard deck C=Clubs D=Diamonds H=Hearts S=Spades
    createDeck() {
        const suits = ['C', 'D', 'H', 'S'];
        const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        for (let i = 0; i < suits.length; i++) {
            for (let j = 0; j < ranks.length; j++) {
                this.cards.push(new Card(suits[i], ranks[j]));
            }
        }
    };

    deal() {
        return this.cards.splice(Math.floor(Math.random() * this.cards.length), 1)[0];
    };
}

class Player {
    constructor(name) {
        this.playerName = name;
        this.playerCards = [];
    };
    //give new card on hit
    addCard(card) {
        this.playerCards.push(card)
    };

    //sum hand values on stay
    calcTotal() {
        let points = 0;
        let hasAce = false;
        for (let i = 0; i < this.playerCards.length; i++) {
            let card = this.playerCards[i];
            if (card.rank === 'A') {
                hasAce = true;
            } else if (card.rank === 'J' || card.rank === 'Q' || card.rank === 'K') {
                points += 10;
            } else {
                points += Number(card.rank);
            }
        }
        if (hasAce) {
            if (points + 11 <= 21) {
                points += 11;
            } else {
                points += 1;
            }
        }
        return points;
    };
};

class Table {
    constructor() {
        this.players = [];
        this.deck = []
    };

    //initialize match
    start(playerOneName, playerTwoName, handSize) {
        const player = new Player(playerOneName);
        const dealer = new Player(playerTwoName)
        this.players.push(player);
        this.players.push(dealer);
        let deck = new Deck();
        deck.createDeck();
        this.deck = deck;
        console.log("deck before deal", deck)
        console.log('start:', player, dealer)
        for (let i = 0; i < handSize; i++) {
            player.addCard(deck.deal());
            dealer.addCard(deck.deal());
        }
        console.log("deck after deal", deck)
    };

    //changes suit letter to corresponding icon
    suitIcon(cardSuit) {
        let suitIcon;
        switch (cardSuit) {
            case 'H':
                suitIcon = '&#9829;';
                break;
            case 'D':
                suitIcon = '&#9830;';
                break;
            case 'S':
                suitIcon = '&#9824;';
                break;
            case 'C':
                suitIcon = '&#9827;';
                break;
        }
        return suitIcon;
    };

    //renders hand to browser
    renderHand(hand, playerName) {
        const dealerHandHolder = document.querySelector('.dealerHand')
        const playerHandHolder = document.querySelector('.playerHand')
        let handLength = hand.length;
        //reset handHolders if they already have content
        if (!playerHandHolder.innerHTML == '' && !dealerHandHolder.innerHTML == '') {
            playerHandHolder.innerHTML = '';
            dealerHandHolder.innerHTML = '';
        };
        //loop over hand array
        for (let i = 0; i < handLength; i++) {
            //ui elements
            const cardHolder = document.createElement("div");
            const card = document.createElement("div");
            //number card, to display multiple suit icons based on value
            const suitDisp = document.createElement("div");
            //build each card by suit and rank
            let cardSuit = hand[i].suit;
            let cardFace = hand[i].rank;
            //card classes reset
            cardHolder.classList.add("cardHolder");
            card.classList.remove('H', 'D', 'S', 'C', 'A', 'K', 'Q', 'J');
            card.classList.add("card", 'in_animation');
            //check if face card
            if (cardFace === 'A' || cardFace === 'K' || cardFace === 'Q' || cardFace === 'J') {
                //set card class
                card.classList.add(cardSuit, cardFace)
                //face card render
                card.innerHTML =
                    `<div class="card-value-suit top"> <span>${cardFace}</span> <span>${this.suitIcon(cardSuit)}</span></div>
                <div class="card-suit ${cardFace}"> ${cardFace} </div>
                <div class="card-value-suit bot"><span>${cardFace}</span> <span>${this.suitIcon(cardSuit)}</span></div>`;
                cardHolder.appendChild(card);
            } else {
                //set card class
                card.classList.add(cardSuit, cardFace)
                suitDisp.classList.add("card-suit", cardFace);
                //top of card
                card.innerHTML = `<div class="card-value-suit top"> <span>${cardFace}</span> <span>${this.suitIcon(cardSuit)}</span></div>`;
                //dynamiclly add icons to number card based on it's value
                for (let i = 0; i < Number(cardFace); i++) {
                    suitDisp.innerHTML += `<span>${this.suitIcon(cardSuit)}</span>`;
                };
                //append icons to middle of card
                card.appendChild(suitDisp);
                //render bottom of card
                card.innerHTML += `<div class="card-value-suit bot"> <span>${cardFace}</span> <span>${this.suitIcon(cardSuit)}</span></div>`;
                cardHolder.appendChild(card)
            };
            //append cardholder to handholder
            if (playerName === "Dealer") {
                dealerHandHolder.appendChild(cardHolder)
            }
            else {
                playerHandHolder.appendChild(cardHolder)
            }
        };
    }

}
//main app
function main() {
    //main ui elements
    const dealButton = document.querySelector('.deal');
    const hitButton = document.querySelector('.hit');
    const stayButton = document.querySelector('.stay');
    const gameArea = document.querySelector(".gameArea");
    const playerArea = document.querySelector(".playerArea");
    const dealerArea = document.querySelector(".dealerArea");
    const playerScoreArea = document.createElement('p');
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
        hitButton.disabled = false;
        hitButton.classList.remove('greyOut')
        stayButton.classList.remove('winButton')
        stayButton.classList.remove('greyOut')
        gameArea.classList.remove('hiddenArea')
        gameArea.classList.add('gameArea')
        gameBoard = new Table();
        //starting match
        gameBoard.start('Player', 'Dealer', 2);
        player = gameBoard.players[0];
        dealer = gameBoard.players[1];
        //render hands to browser
        gameBoard.renderHand(player.playerCards, player.playerName);
        gameBoard.renderHand(dealer.playerCards, dealer.playerName);
        //calculate scores
        playerScore = player.calcTotal();
        dealerScore = dealer.calcTotal();
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
    });
    //new card on click "hit"

    hitButton.addEventListener("click", () => {
        //give player another card
        player.addCard(gameBoard.deck.deal());
        //update player score
        playerScore = player.calcTotal();
        //update hands/cards display
        gameBoard.renderHand(player.playerCards, player.playerName);
        gameBoard.renderHand(dealer.playerCards, dealer.playerName);

        //win & lose conditions
        if (playerScore === 21) {
            playerScoreArea.innerHTML = 'Blackjack 21!';
            hitButton.disabled = true;
            hitButton.classList.add('greyOut')
            stayButton.classList.add('winButton')
        }
        else if (playerScore > 21) {
            playerScoreArea.innerHTML = `${playerScore} Bust! Deal again.`;
            hitButton.disabled = true;
            hitButton.classList.add('greyOut')
            stayButton.classList.add('greyOut')
        } else {
            //display score
            playerScoreArea.innerHTML = `Your current score: ${playerScore}`;
        }
    })

}

main();