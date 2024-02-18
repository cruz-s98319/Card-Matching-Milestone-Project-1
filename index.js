const gridContainer = document.querySelectorAll('.card');
let cards = [];
// let flippedCard = false;
let firstCard, secondCard;
let lockBoard = false;
let score = 0

document.querySelector(".score").textContent = score;

fetch("./data/cards.json")
    .then((res) => res.json())
    .then((data) => {
        cards = [...data, ...data];
        shuffleCards();
        generateCards();
    });

// function flipCard() {
//     if (lockBoard) return;
//     if (this === firstCard) return;

//     this.classList.add('flip');

//     if (!flippedCard) {
//         flippedCard = true;
//         firstCard = this;
//         return;
//     }

//     secondCard = this;
//     checkForMatch();
// }

// function checkForMatch() {
//     let isMatch = firstCard.dataset.card === secondCard.dataset.card;
//     isMatch ? disableCards() : unflipCards();
// }

// function disableCards() {
//     firstCard.removeEventListener('click', flipCard);
//     secondCard.removeEventListener('click', flipCard);

//     resetBoard();
// }

// function unflipCards() {
//     lockBoard = true;

//     setTimeout(() => {
//         firstCard.classList.remove('flip');
//         secondCard.classList.remove('flip');

//         resetBoard();
//     }, 1000);
// }

// function resetBoard() {
//     [flippedCard, lockBoard] = [false, false];
//     [firstCard, secondCard] = [null, null];
// }

// cards.forEach(card => card.addEventListener('click', flipCard));
