'use strict';

//Selecting elements
const player0 = document.querySelector('.player__0');
const player1 = document.querySelector('.player__1');

const btnRollDice = document.querySelector('.btn-roll-dice');
const btnNewGame = document.querySelector('.btn-new-game');
const btnHold = document.querySelector('.btn-hold');

const totalScore1 = document.querySelector('#score__0');
const totalScore2 = document.querySelector('#score__1');
const currentScore1 = document.querySelector('#current__0');
const currentScore2 = document.querySelector('#current__1');


const imageDice = document.querySelector('.image');

let currentScore, totalScores, activePlayer, playing;

// FUNCTIONS
const initialization = () => {
   imageDice.classList.add('hidden');
   player0.classList.remove('plalyer__winner');
   player1.classList.remove('plalyer__winner');
   player0.classList.add('_active');
   player1.classList.remove('_active');

   totalScore1.textContent = 0;
   totalScore2.textContent = 0;
   currentScore1.textContent = 0;
   currentScore2.textContent = 0;

   activePlayer = 0;
   totalScores = [0, 0];
   currentScore = 0;
   playing = true;
}

initialization();

const rollDiceFun = () => {
   const diceNumber = Math.trunc(Math.random() * 6) + 1;
   console.log(diceNumber);
   return diceNumber;
}

const anotherPlayer = () => {
   player0.classList.toggle('_active');
   player1.classList.toggle('_active');
   activePlayer = (activePlayer === 0) ? 1 : 0;
   currentScore = 0;
}

// EVENTS

btnRollDice.addEventListener('click', () => {
   if (playing) {
      const diceNumber = rollDiceFun();
      imageDice.src = `img/dice-${diceNumber}.png`;
      imageDice.classList.remove('hidden');

      if (diceNumber !== 1) {
         currentScore += diceNumber;
         document.querySelector(`#current__${activePlayer}`).textContent = currentScore;

      } else {
         document.querySelector(`#current__${activePlayer}`).textContent = 0;
         anotherPlayer();
      }
   }
})


btnHold.addEventListener('click', () => {

   if (playing) {

      totalScores[activePlayer] += currentScore;
      document.querySelector(`#score__${activePlayer}`).textContent = totalScores[activePlayer];
      document.querySelector(`#current__${activePlayer}`).textContent = 0;

      if (totalScores[activePlayer] >= 100) {
         document.querySelector(`.player__${activePlayer}`).classList.add('plalyer__winner');
         document.querySelector(`.player__${activePlayer}`).classList.remove('_active');
         imageDice.classList.add('hidden');
         playing = false;
      } else {
         anotherPlayer();
      }
   }
})

btnNewGame.addEventListener('click', initialization);