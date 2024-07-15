'use strict';

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

const score0EL = document.getElementById('score--0');
const score1EL = document.getElementById('score--1');
const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');

const diceEL = document.querySelector('.dice');
const diceNewEL = document.querySelector('.btn--new');
const diceRollEL = document.querySelector('.btn--roll');
const diceHoldEL = document.querySelector('.btn--hold');

const howTo = document.querySelector('.btn--how');
const overlayEL = document.querySelector('.overlay');
const modalEl = document.querySelector('.modal');
const closeModalEl = document.querySelector('.close-modal');

function startGame() {
  modalEl.classList.add('hidden');
  overlayEL.classList.add('hidden');
}

overlayEL.addEventListener('click', startGame);
closeModalEl.addEventListener('click', startGame);

howTo.addEventListener('click', function () {
  modalEl.classList.remove('hidden');
  overlayEL.classList.remove('hidden');
});

let activePlayer = 0;
let currentScore = 0;
let totalScores = [0, 0];

let playing = true;

function init() {
  playing = true;
  currentScore = 0;
  totalScores = [0, 0];

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner', 'name');

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active');

  activePlayer = activePlayer === 0 ? 1 : 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.toggle('player--active');

  document.getElementById(`current--${activePlayer}`).textContent = 0;
  resetValues();
  diceEL.classList.add('hidden');

  overlayEL.classList.add('hidden');
  document.querySelector('.modal').classList.add('hidden');
}

// function to switch players

function switchPlayers() {
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

// function to reset the scores

function resetValues() {
  score0EL.textContent = 0;
  score1EL.textContent = 0;
}

// button Roll functionality
diceRollEL.addEventListener('click', function () {
  // generating a random dice roll
  if (playing) {
    let diceNumberEL = Math.trunc(Math.random() * 6) + 1;

    // function to display the dice according to the random number generated on a click
    function showDice() {
      diceEL.classList.remove('hidden');
      diceEL.src = `dice-${diceNumberEL}.png`;
    }
    showDice();

    // check for rolled 1
    if (diceNumberEL !== 1) {
      // if not 1 add the die number to current score
      currentScore += diceNumberEL;

      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    }
    // switch to the next player
    else {
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      switchPlayers();
    }
  }
});

diceHoldEL.addEventListener('click', function () {
  if (playing) {
    totalScores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      totalScores[activePlayer];
    document.getElementById(`current--${activePlayer}`).textContent = 0;

    if (totalScores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner', 'name');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEL.classList.add('hidden');
    } else {
      switchPlayers();
      currentScore = 0;
    }
  }
});

resetValues();

// diceNewEL.addEventListener('click', function () {
//   playing = true;
//   currentScore = 0;
//   totalScores = [0, 0];

//   document
//     .querySelector(`.player--${activePlayer}`)
//     .classList.remove('player--winner', 'name');

//   document
//     .querySelector(`.player--${activePlayer}`)
//     .classList.remove('player--active');

//   activePlayer = activePlayer === 0 ? 1 : 0;
//   document
//     .querySelector(`.player--${activePlayer}`)
//     .classList.toggle('player--active');

//   document.getElementById(`current--${activePlayer}`).textContent = 0;
//   resetValues();
//   diceEL.classList.add('hidden');
// });

diceNewEL.addEventListener('click', init);
