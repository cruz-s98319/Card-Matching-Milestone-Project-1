const gridContainer = document.querySelector('.memory-game');
let cards = [];
let firstCard, secondCard;
let lockBoard = false;
let score = 0
let uniqueImages = [];

document.querySelector(".score").textContent = score;

fetch("./data/cards.json")
    .then((res) => res.json())
    .then((data) => {
        cards = [...data, ...data];
        shuffleCards();
        generateCards();
    });

function shuffleCards() {
    let currentIndex = cards.length,
        randomIndex,
        temporaryValue;
    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = cards[currentIndex];
        cards[currentIndex] = cards[randomIndex];
        cards[randomIndex] = temporaryValue;
    }
}

function generateCards() {
    randomImages = [];

    while (randomImages.length < 8) {
        const randomIndex = Math.floor(Math.random() * cards.length);
        const randomCard = cards[randomIndex];
        if (!randomImages.includes(randomCard.image)) {
            randomImages.push(randomCard.image);
        }
    }

    const duplicatedImages = [...randomImages, ...randomImages];

    shuffleImages(duplicatedImages);

    for (let image of duplicatedImages) {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");
        cardElement.setAttribute("data-name", image);
        cardElement.innerHTML = `
            <div class="front">
                <img class="front-image" src="${image}" alt="${image}" />
            </div>
            <div class="back"></div>
        `;
        gridContainer.appendChild(cardElement);
        cardElement.addEventListener("click", flipCard);
    }
}

function shuffleImages(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const x = Math.floor(Math.random() * (i + 1));
        [array[i], array[x]] = [array[x], array[i]];
    }
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add("flipped");

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;

    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;

    if (isMatch) {
        score++;
        document.querySelector(".score").textContent = score;
        disableCards();
    } else {
        setTimeout(() => {
            firstCard.classList.remove("flipped");
            secondCard.classList.remove("flipped");
            resetBoard();
        }, 1000);
    }
    
    checkScore()
}

function disableCards() {
    firstCard.removeEventListener("click", flipCard);
    secondCard.removeEventListener("click", flipCard);

    resetBoard();
}

function resetBoard() {
    firstCard = null;
    secondCard = null;
    lockBoard = false;
}

function restart() {
    resetBoard();
    shuffleCards();
    score = 0;
    document.querySelector(".score").textContent = score;
    gridContainer.innerHTML = "";
    generateCards();
}

function checkScore() {
    if (score === 8) {
        document.querySelector('.message').style.display = 'block';
    }
}
