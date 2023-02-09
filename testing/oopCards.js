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

    //builds a standard deck
    createDeck() {
        let suits = ['C', 'D', 'H', 'S'];
        let ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        for (let i = 0; i < suits.length; i++) {
            for (let j = 0; j < ranks.length; j++) {
                this.cards.push(new Card(suits[i], ranks[j]));
            }
        }
    };

    //shuffles deck
    shuffle() {
        let currentIndex = this.cards.length, temporaryValue, randomIndex;
        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            temporaryValue = this.cards[currentIndex];
            this.cards[currentIndex] = this.cards[randomIndex];
            this.cards[randomIndex] = temporaryValue;
        }
    };

    //shuffle deck and deal card popped from deck
    deal() {
        return this.cards.pop()
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
        let player = new Player(playerOneName);
        let dealer = new Player(playerTwoName)
        this.players.push(player);
        this.players.push(dealer);
        let deck = new Deck();
        deck.createDeck();
        console.log("deck before deal", deck)
        this.deck = deck;
        deck.shuffle();
        //  console.log("after shuffle", this.deck)
        console.log('start:', player, dealer)
        for (let i = 0; i < handSize; i++) {
            player.addCard(deck.deal());
            dealer.addCard(deck.deal());
        }
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
        //reset handHolders if they already have content
        if (!playerHandHolder.innerHTML == '' && !dealerHandHolder.innerHTML == '') {
            console.log('childs')
            playerHandHolder.innerHTML = '';
            dealerHandHolder.innerHTML = '';
        };

        console.log('player hand:')
        for (let i = 0; i < hand.length; i++) {
            //ui elements
            const cardHolder = document.createElement("div");
            const card = document.createElement("div");
            //build each card by suit and rank
            let cardSuit = hand[i].suit;
            let cardFace = hand[i].rank;
            console.log(cardFace, cardSuit)

            cardHolder.classList.add("cardHolder");
            //card class reset
            card.classList.remove('H', 'D', 'S', 'C', 'A', 'K', 'Q', 'J');
            card.classList.add("card", 'in_animation');

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
                //number card render
                const suitDisp = document.createElement("div");
                //set card class
                card.classList.add(cardSuit, cardFace)
                suitDisp.classList.add("card-suit", cardFace);
                //top of card
                card.innerHTML = `<div class="card-value-suit top"> <span>${cardFace}</span> <span>${this.suitIcon(cardSuit)}</span></div>`;

                //add icons to icon holder div based on card value
                for (let i = 0; i < Number(cardFace); i++) {
                    suitDisp.innerHTML += `<span>${this.suitIcon(cardSuit)}</span>`;
                };
                //append icons to middle of card
                card.appendChild(suitDisp);

                //bottom of card
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


function main() {
    const dealButton = document.querySelector('.deal');
    const hitButton = document.querySelector('.hit');
    const stayButton = document.querySelector('.stay');
    const gameArea = document.querySelector(".gameArea");
    const playerArea = document.querySelector(".playerArea");
    const dealerArea = document.querySelector(".dealerArea");
    const p = document.createElement('p');

    gameArea.classList.remove('gameArea')
    gameArea.classList.add('hiddenArea');
    p.classList.add('scoreArea')
    playerArea.appendChild(p)

    let gameBoard;
    let player; 
    let dealer; 

    dealButton.addEventListener("click", () => {
        gameArea.classList.remove('hiddenArea')
        gameArea.classList.add('gameArea')
        gameBoard = new Table();
        //start match
        gameBoard.start('Player', 'Dealer', 2);
        player = gameBoard.players[0];
        dealer = gameBoard.players[1];

        //render hands to browser
        gameBoard.renderHand(player.playerCards, player.playerName);
        gameBoard.renderHand(dealer.playerCards, dealer.playerName);
        console.log("deck after deal: ", gameBoard.deck)
        console.log(player.playerName + " hand: " + player.calcTotal())
        console.log(dealer.playerName + " hand: " + dealer.calcTotal())
        let playerScore = player.calcTotal();
        p.innerHTML = `Your current score: ${playerScore}`
    })
}

main()