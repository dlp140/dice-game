'use strict'

// Selecting score elements
const player0El = document.querySelector('.player--0')
const player1El = document.querySelector('.player--1')
const score0El = document.querySelector('#score--0')
const score1El = document.getElementById('score--1')
const current0El = document.getElementById('current--0')
const current1El = document.getElementById('current--1')

const diceEl = document.querySelector('.dice')
const btnNew = document.querySelector('.btn--new')
const btnRoll = document.querySelector('.btn--roll')
const btnHold = document.querySelector('.btn--hold')

// Starting conditions

let scores = [0, 0]
let currentScore = 0
let activePlayer = 0

let playing = true

const init = () => {
  playing = true
  scores = [0, 0]

  currentScore = 0
  activePlayer = 0

  score0El.textContent = 0
  score1El.textContent = 0
  current0El.textContent = 0
  current1El.textContent = 0

  player0El.classList.remove('player--winner')
  player1El.classList.remove('player--winner')
  player0El.classList.add('player--active')
  player1El.classList.remove('player--active')

  diceEl.classList.add('hidden')
}

init()

const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0
  currentScore = 0
  activePlayer = activePlayer === 0 ? 1 : 0
  player0El.classList.toggle('player--active')
  player1El.classList.toggle('player--active')
}

// Rolling dice functionality
btnRoll.addEventListener('click', () => {
  if (playing) {
    // Generate random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1
    // Display dice
    diceEl.classList.remove('hidden')
    diceEl.src = `dice-${dice}.png`
    // Check for rolled 1: if true, next player
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore
      // TODO -CHANGE LATER
    } else {
      // Switch to next player
      switchPlayer()
    }
  }
})

btnHold.addEventListener('click', () => {
  if (playing) {
    // Add current score to active player's total score and display it
    scores[activePlayer] += currentScore

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer]

    // Check if total score is >= 100 -> Finish game
    if (scores[activePlayer] >= 10) {
      playing = false
      diceEl.classList.add('hidden')
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner')
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active')
    } else {
      // Switch players
      switchPlayer()
    }
  }
})

btnNew.addEventListener('click', init)
