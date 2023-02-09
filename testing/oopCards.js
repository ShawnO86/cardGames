class Card {
    constructor(suit, rank, value, id) {
        this.suit = suit;
        this.rank = rank;
        this.value = value;
        this.id = id;
    }
}

class Deck {
    constructor() {
        this.cards = [];
    }
    //builds standard deck
    createDeck() {
        let suits = ['C', 'D', 'H', 'S'];
        let ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        let values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 1];
        let id;
        for (let i = 0; i < suits.length; i++) {
            for (let j = 0; j < ranks.length; j++) {
                id = suits[i].charAt(0) + ranks[j];
                this.cards.push(new Card(suits[i], ranks[j], values[j], id));
            }
        }
    }
    //builds hand
    getCards(handSize) {
        let hand = [];
        for (let i = 0; i < handSize; i++) {
            //splice 1 randomly selected card and push to hand array
            hand.push(this.cards.splice(Math.floor(Math.random() * this.cards.length), 1)[0])
        }
        return hand
    }
}

class Player {
    constructor(name) {
        this.playerName = name;
        this.playerCards = [];
    }
}

class Table {
    constructor() {
        this.cardsInMiddle = [];
        this.players = [];
        this.deck = []
    }
    //initial match
    start(playerOneName, playerTwoName) {
        this.players.push(new Player(playerOneName));
        this.players.push(new Player(playerTwoName));
        let d = new Deck();
        d.createDeck();
        this.deck = d;
        this.players[0].playerCards = d.getCards(5);
        this.players[1].playerCards = d.getCards(5);
    }
    //sum hand values
    calcTotal(hand) {
        let currentValue;
        let total = 0;
        for (let i = 0; i < hand.length; i++) {
            currentValue = hand[i].value;
            total += currentValue;
            console.log('card ' + i + ': ' + currentValue, total)
        }
        return total
    }
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
    }
    //renders hand to browser
    renderHand(hand, playerName) {
        console.log(`renderHand args: Hand size: ${hand.length}, Player name: ${playerName}`)

        const dealerHandHolder = document.querySelector('.dealerHand')
        const playerHandHolder = document.querySelector('.playerHand')
        //reset handHolders if they have content
        if (!playerHandHolder.innerHTML == '' && !dealerHandHolder.innerHTML == '') {
            console.log('childs')
            playerHandHolder.innerHTML = '';
            dealerHandHolder.innerHTML = '';
        }

        console.log('player hand:')
        for (let i = 0; i < hand.length; i++) {
            //ui elements
            const cardHolder = document.createElement("div");
            const button = document.createElement("button");
            const card = document.createElement("div");
            //build each card by suit and rank
            let cardSuit = hand[i].suit;
            let cardFace = hand[i].rank;
            button.innerHTML = "New Card";
            button.classList.add("newCard", cardSuit + cardFace, playerName);
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
            }

            //need new card function here
            cardHolder.appendChild(button);
            button.addEventListener('click', () => {
                //gameArea.innerHTML = ''
                console.log(button.classList[1], "clicked")
            })

            //append card to holder
            if (playerName === "Dealer") {
                dealerHandHolder.appendChild(cardHolder)
            }
            else {
                playerHandHolder.appendChild(cardHolder)
            }
        }
    }

}

const gameArea = document.querySelector(".gameArea");
function main() {
    let gameBoard = new Table();
    const dealButton = document.querySelector('.deal');


    let playerHand = [];
    let dealerHand = []
    dealButton.addEventListener("click", () => {
        //start match
        gameBoard.start('Player', 'Dealer');
        //define starting hands
        playerHand = gameBoard.players[0].playerCards;
        dealerHand = gameBoard.players[1].playerCards;
        //render hands to browser
        gameBoard.renderHand(playerHand, gameBoard.players[0].playerName);
        gameBoard.renderHand(dealerHand, gameBoard.players[1].playerName);
        console.log("remaining cards in deck: ", gameBoard.deck)
    })
}

main()