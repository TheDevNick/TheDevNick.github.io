/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/

var scores, roundScore, activePlayer, gamePlaying;

  // call init function
  init();

  // setting up event handler for the roll button
  document.querySelector('.btn-roll').addEventListener('click', function() {
    // including a state variable 
    if (gamePlaying) {
      // 1. need a random number for dice 1
    var dice = Math.floor(Math.random() * 6) + 1;
      // 1a.need random number for dice 2
    var diceTwo = Math.floor(Math.random() * 6) + 1;
    // 2. display the result for dice 1
    var diceDOM = document.querySelector('.dice');
    diceDOM.style.display = 'block';
    diceDOM.src = 'dice-' + dice + '.png';
    // 2a. Display the results for dice 2
    var diceTwoDOM = document.querySelector('.diceTwo');
    diceTwoDOM.style.display = 'block';
    diceTwoDOM.src = 'dice-' + diceTwo + '.png';

     if(dice !== 1 && diceTwo !== 1) { // '!==' means different than  //3. update the round score if the rolled number was not a 1
      // add score for dice 1 and dice 2
      roundScore += dice + diceTwo;
      //same as writing roundScore = (current) roundScore + dice + diceTwo;

      // display result in the UI
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else  {
      // next player
      nextPlayer();
      }
    
    }

  });
  
  // setting up a event listener for the hold button
  document.querySelector('.btn-hold').addEventListener('click', function() {
    // add state variable in a if statement
    if (gamePlaying) {
      // add current score to player global score
      scores[activePlayer] += roundScore;

    // update UI 
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

    // Making sure a winning score is entered or else the winning socre is 30
      var setScore, winningScore;
      setScore = document.getElementById('set_score').value;
      if(setScore) {
        winningScore = setScore;
      } else {
        winningScore = 30;
      }

    // check if player won the game
     if (scores[activePlayer] >= winningScore) {
      
       document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
       document.querySelector('#name-' + activePlayer).style.color = '#EB4D4D';
       document.querySelector('#name-' + activePlayer).style.fontWeight = '300';
       // removes dices after a player has won the game
      document.querySelector('.dice').style.display = 'none';
      document.querySelector('.diceTwo').style.display = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      gamePlaying = false;
     } else {
    // next player
      nextPlayer();
     }
    }
  });

  // next player function
  function nextPlayer() {
   
    if (activePlayer === 0) {
      activePlayer = 1;
    } else {
      activePlayer = 0;
    }

    roundScore = 0;

      document.getElementById('current-0').textContent = '0';
      document.getElementById('current-1').textContent = '0';
      // displaying the active user
      document.querySelector('.player-0-panel').classList.toggle('active');
      document.querySelector('.player-1-panel').classList.toggle('active');

      // make dice disapear when player rolls a 1 and its the next player turn
      document.querySelector('.dice').style.display = 'none';
      document.querySelector('.diceTwo').style.display = 'none';
  }

  // initializing a new game 
  document.querySelector('.btn-new').addEventListener('click', init);

  function init() {
    // without setting this to true, the game will not work at all!
    gamePlaying = true;
    // reset player scores to 0
    scores = [0,0];
    activePlayer = 0; // 0 will be the 1st player and 1 will be the 2nd player
    roundScore = 0;

    // Manipulating CSS with query selector (hiding the dice in the beginning of game until roll)
  document.querySelector('.dice').style.display = 'none';
  document.querySelector('.diceTwo').style.display = 'none';

  // setting player 1 and player 2 scores and current score to 0 using getElementByID and textContent
  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'Player 1';
  document.getElementById('name-1').textContent = 'Player 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.add('active');
  }


  // adding instructions to the game using click event listeners
  // create a function for the pop up 

  function popUpInfo() {
    // creating a div element for the pop up box
    var popUp = document.createElement('div');

    // creating a class for the div element
    popup.className = 'popUp';

    // creating a id for the div element
    popUp.id = 'test';

    var cancel = document.createElement('div');
    cancel.className = 'cancel';

    // this makes the popup dissapear on click
     cancel.onclick = function (e) { popup.parentNode.removeChild(popup) };

     var message = document.createElement('span');
     message.innerHTML = "This is a test message";
     popup.appendChild(message);                                    
     popup.appendChild(cancel);
     document.body.appendChild(popup);

  }
  
  function openPopup() {
    document.getElementById('test').style.display = 'flex';
    document.getElementById('test').style.justifyContent = 'space-between ';
}

function closePopup() {
    document.getElementById('test').style.display = 'none';
}

// setting the winning score 
var setScore = document.getElementById('set_score').value;
