const gameBoard = document.getElementById('game-board');
const cards = ['A', 'A', 'B', 'B', 'C', 'C', 'D', 'D'];
let flippedCards = [];
let matchedCards = [];
let canFlip = true;

function createBoard() {
  cards.sort(() => Math.random() - 0.5);
  cards.forEach((value, index) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = value;
    card.addEventListener('click', flipCard);
    gameBoard.appendChild(card);
  });
}

function flipCard() {
  if (!canFlip || flippedCards.length >= 2 || this.classList.contains('flipped') || this.classList.contains('matched')) {
    return;
  }

  this.classList.add('flipped');
  this.textContent = this.dataset.value;
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    canFlip = false;
    checkMatch();
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;
  if (card1.dataset.value === card2.dataset.value) {
    card1.classList.add('matched');
    card2.classList.add('matched');
    matchedCards.push(card1, card2);
    flippedCards = [];
    canFlip = true;
    if (matchedCards.length === cards.length) {
      setTimeout(() => alert('Parabéns! Você venceu!'), 500);
    }
  } else {
    setTimeout(() => {
      card1.classList.remove('flipped');
      card2.classList.remove('flipped');
      card1.textContent = '';
      card2.textContent = '';
      flippedCards = [];
      canFlip = true;
    }, 1000);
  }
}

createBoard();