"use strict";

// ?==================== varibales ====================?

// Buttons
const newGameBtn = document.querySelector(".btn--new");
const rollDiceBtn = document.querySelector(".btn--roll");
const holdBtn = document.querySelector(".btn--hold");

// Dice
const diceNumber = document.querySelector(".dice");

// Player 1
const player1 = document.querySelector(".player--0");
const scoreElement1 = document.querySelector("#score--0");
const currentScoreElement1 = document.querySelector("#current--0");

// Player 2
const player2 = document.querySelector(".player--1");
const scoreElement2 = document.querySelector("#score--1");
const currentScoreElement2 = document.querySelector("#current--1");

let currentScore, currentPlayer, scores, playing;

// ?==================== functions ====================?

const startNewGame = () => {
  // Initial Total Score Values For Each Player
  scoreElement1.textContent = 0;
  scoreElement2.textContent = 0;

  // Initial Currunt Score Values For Each Player
  currentScoreElement1.textContent = 0;
  currentScoreElement2.textContent = 0;

  // Hide the dice number at the begining
  diceNumber.classList.add("hidden");

  // Set Player 1 as the current player in the first position
  player1.classList.add("player--active");
  player2.classList.remove("player--active");

  // For starting a new game (new game btn)
  player1.classList.remove("player--winner");
  player2.classList.remove("player--winner");

  // Initial current score for current player
  currentScore = 0;

  // Set Player 1 as the current player in the first position (0 => player 1 || 1 => player 2)
  currentPlayer = 0;

  // Player-1 and Player-2 Scores
  scores = [0, 0];

  // initial game state
  playing = true;
};
// Starting new game first
startNewGame();

const switchPlayer = () => {
  currentScore = 0;
  document.querySelector(`#current--${currentPlayer}`).textContent =
    currentScore;
  // switch to player 2 or to player 1
  currentPlayer = currentPlayer === 0 ? 1 : 0;

  // Adding and Removing "player--active" class
  player1.classList.toggle("player--active");
  player2.classList.toggle("player--active");
};

// ?==================== events ====================?

// Starting over a new game
newGameBtn.addEventListener("click", startNewGame);

// Rolling the dice
rollDiceBtn.addEventListener("click", () => {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice number
    diceNumber.classList.remove("hidden");
    // diceNumber.setAttribute("src", `assets/images/dice-${dice}.png`);
    diceNumber.src = `assets/images/dice-${dice}.png`;

    // 3. Check for rolled 1
    if (dice !== 1) {
      //  add dice to the current score
      currentScore += dice;

      // select the player dynamically based on which is the active player now
      document.querySelector(`#current--${currentPlayer}`).textContent =
        currentScore;
      // currentScoreElement1.textContent = currentScore;
    }
    // Switch to next player
    else {
      switchPlayer();
    }
  }
});

// Holding the score of the current player
holdBtn.addEventListener("click", () => {
  if (playing) {
    // 1. Add current score to active player's score
    scores[currentPlayer] += currentScore;
    // scores[1] = scores[1] + currentScore

    document.querySelector(`#score--${currentPlayer}`).textContent =
      scores[currentPlayer];

    // 2. Check the current player's score > 100. so, finish the game
    if (scores[currentPlayer] >= 20) {
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${currentPlayer}`)
        .classList.remove("player--active");
      // Finish the game
      playing = false;
    } else {
      switchPlayer();
    }
  }
});
