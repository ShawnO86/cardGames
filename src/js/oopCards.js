
class Card {
    constructor(suit, rank) {
        this.suit = suit;
        this.rank = rank;
    };
};

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
};

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
        for (let i = 0; i < handSize; i++) {
            player.addCard(deck.deal());
            dealer.addCard(deck.deal());
        }
        this.players.forEach((player) => {
            this.renderInitialHands(player)
        })
        console.log('start:\n',player, dealer)
        console.log('remaining cards: ', deck)
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
    renderInitialHands(player) {
        const dealerHandHolder = document.querySelector('.dealerHand')
        const playerHandHolder = document.querySelector('.playerHand')
        let hand = player.playerCards;
        let playerName = player.playerName;
        //reset handHolders if they already have content
        if (!playerHandHolder.innerHTML == '' && !dealerHandHolder.innerHTML == '') {
            playerHandHolder.innerHTML = '';
            dealerHandHolder.innerHTML = '';
        }
        //loop over hand array
        for (let i = 0; i < hand.length; i++) {
            //ui elements        
            const cardHolder = document.createElement("div");
            cardHolder.classList.add("cardHolder");
            //build each card by suit and rank
            let cardSuit = hand[i].suit;
            let cardFace = hand[i].rank;
            cardHolder.appendChild(this.renderCard(cardSuit, cardFace));
            //append cardholder to handholder
            if (playerName === "Dealer") {
                dealerHandHolder.appendChild(cardHolder)
            }
            else {
                playerHandHolder.appendChild(cardHolder)
            }
        };
    }

    newCard(player) {
        //player = gameBoard.players[0];
        //dealer = gameBoard.players[1];
        //player data
        const cardHolder = document.createElement("div");
        const dealerHandHolder = document.querySelector('.dealerHand')
        const playerHandHolder = document.querySelector('.playerHand')
        const playerName = player.playerName;;
        const card = this.deck.deal();
        const cardSuit = card.suit;
        const cardFace = card.rank;
        cardHolder.classList.add("cardHolder");
        player.addCard(card)
        cardHolder.appendChild(this.renderCard(cardSuit, cardFace));
        //check if face card
        if (playerName === "Dealer") {
            dealerHandHolder.appendChild(cardHolder)
        }
        else {
            playerHandHolder.appendChild(cardHolder)
        }
    };

    renderCard(suit, face) {
        const cardDiv = document.createElement("div");
        const suitDisp = document.createElement("div");
        cardDiv.classList.add("card", 'in_animation', suit, face);

        if (face === 'A' || face === 'K' || face === 'Q' || face === 'J') {
            //face card render
            cardDiv.innerHTML =
                `<div class="card-value-suit top"> <span>${face}</span> <span>${this.suitIcon(suit)}</span></div>
                        <div class="card-suit ${face}"> ${face} </div>
                        <div class="card-value-suit bot"><span>${face}</span> <span>${this.suitIcon(suit)}</span></div>`;
        } else {
            suitDisp.classList.add("card-suit", face);
            //top of card
            cardDiv.innerHTML = `<div class="card-value-suit top"> <span>${face}</span> <span>${this.suitIcon(suit)}</span></div>`;
            //dynamiclly add icons to number card based on it's value
            for (let i = 0; i < Number(face); i++) {
                suitDisp.innerHTML += `<span>${this.suitIcon(suit)}</span>`;
            };
            //append icons to middle of card
            cardDiv.appendChild(suitDisp);
            //render bottom of card
            cardDiv.innerHTML += `<div class="card-value-suit bot"> <span>${face}</span> <span>${this.suitIcon(suit)}</span></div>`;
        }
        return cardDiv
    }
};

export {Card, Deck, Player, Table}
