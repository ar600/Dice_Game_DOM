/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
var scores, roundScore, activePlayer, gameBeingPlayed;

resetAll();

let lastDice;

document.querySelector('.btn-roll').addEventListener('click', () => { //use anonymous function for your CallBacks
    if (gameBeingPlayed) {
        // 1. Random Number
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;
        // document.querySelector('#current-' + activePlayer).textContent = dice; //textContent is only for plain text but no HTML 
        // document.querySelector('#current-' + activePlayer).innerHTML = `<em> ${dice} </em>`; //em = italic font

        // 2. Display the result
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';
        // document.querySelector('.dice').style.display = 'block';
        // document.querySelector('.dice').src = `dice-${dice}.png`;
        document.getElementById('dice-1').src = `dice-${dice1}.png`;
        document.getElementById('dice-2').src = `dice-${dice2}.png`;

        // 3. Update the roundScore IF the rolled number is NOT 1
        // if (dice === 6 && lastDice === 6) {
        //     scores[activePlayer] = 0;
        //     document.getElementById(`score-${activePlayer}`).textContent = '0';
        //     nextPlayer();
        // } else 
        if (dice1 !== 1 && dice2 !== 1) {
            //Add score
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        } else {
            // Next player
            nextPlayer();
        }
        lastDice = dice; // keep track of the rolled 6 on single die challenge not the double dice challenge
    }
});

document.querySelector('.btn-hold').addEventListener('click', () => {
    if (gameBeingPlayed) {
        scores[activePlayer] += roundScore; // Add current score to GLOBAL score

        // Update the UI
        document.querySelector(`#score-${activePlayer}`).textContent = scores[activePlayer];

        let input = document.querySelector('.final-score').value;

        if (input) {
            var winningScore = input;
        } else {
            winningScore = 20;
        }
        // Check if player WON the game
        if (scores[activePlayer] >= winningScore) {
            document.querySelector(`#name-${activePlayer}`).textContent = 'WINNER!!!';
            hideDice();
            document.getElementById('dice-2').style.display = 'none';
            document.querySelector(`.player-${activePlayer}-panel`).classList.add('winner');
            document.querySelector(`.player-${activePlayer}-panel`).classList.remove('active');
            gameBeingPlayed = false;
        } else {
            // Next Player
            nextPlayer();
        }
    }
});

// New Game
document.querySelector(`.btn-new`).addEventListener('click', resetAll);


///////////////////////////////////////////
///   Helper Functions
function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    // displaying the active player
    // document.querySelector('.player-0-panel').classList.remove('active'); //removing the active class
    // document.querySelector('.player-1-panel').classList.add('active'); //adding the active class
    document.querySelector('.player-0-panel').classList.toggle('active'); // toggle, if it has the class remove it if it does not have it add it
    document.querySelector('.player-1-panel').classList.toggle('active');

    hideDice(); // disappear dice after losing
    document.getElementById('dice-2').style.display = 'none';
}

function resetCurrent() {
    current1.textContent = '0';
    current2.textContent = '0';
}

function resetAll() {
    gameBeingPlayed = true;
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;

    document.getElementById('score-0').textContent = '0'; //getElementById is faster than the querySelector
    document.getElementById('score-1').textContent = '0';

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector(`.player-0-panel`).classList.remove('winner');
    document.querySelector(`.player-1-panel`).classList.remove('winner');
    document.querySelector(`.player-0-panel`).classList.remove('active');
    document.querySelector(`.player-1-panel`).classList.remove('active');
    document.querySelector(`.player-0-panel`).classList.add('active');
    hideDice();
}

function hideDice() {
    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}