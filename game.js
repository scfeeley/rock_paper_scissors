//Running score variables 
let playerWins = 0;
let compWins = 0; 
let totalWins = 0;
let totalGames = 0;
let numWinsToEnd = 5; //number of wins to end round

//Gets computer choice for rock,paper,scissors
function getComputerChoice(){
    let num = Math.ceil(Math.random() * 3 );
    if(num === 1){
        compRock.classList.add('chosen');
        return "Rock";
    }else if(num === 2){
        compPaper.classList.add('chosen');
        return "Paper";
    }else{
        compScissors.classList.add('chosen');
        return "Scissors";
    }
}

//Updates the score for the round
function updateScore(player, comp){
    playerScore.textContent = player;
    compScore.textContent = comp;
}

//Updates the running total 
function updateTotal(player, comp){
    total.textContent = `${playerName.textContent} won ${totalWins} of ${totalGames} games`;
    container.appendChild(total);
}
//Resets round
function resetRound(){
    playerWins = 0; 
    compWins = 0; 
    updateScore(0,0);
}

//Resets Game 
function resetGame(){
    resetRound();
    totalWins = 0;
    totalGames = 0;
    message.textContent ="Let's Play!";
    total.textContent = `You have won ${totalWins} of ${totalGames} games`;
    container.appendChild(total);
    resultContainer.appendChild(message);
}
//Checks to see if the round is over 
function isRoundOver(num){
    if(playerWins === num){
        message.textContent = 'YOU WON!';
        totalWins++;
        totalGames++;
    }else if(compWins === num){
        message.textContent ='YOU LOST! Try again!';
        totalGames++;
    }else{
        return;
    }
    resultContainer.appendChild(message);
    updateTotal(totalWins, totalGames);
    resetRound();
}

//Checks that transition has ended 
function removeTransition(e){
     console.log(e);
    if(e.propertyName !== 'fill'){
     return; 
    }
    this.classList.remove('chosen');
   }

//Plays one round of rock,paper,scissors given the player and computer selections
function playRound(playerSelection, computerSelection){
    playerSelection = playerSelection.toUpperCase();
    computerSelection = computerSelection.toUpperCase();

    //tie 
    if(playerSelection === computerSelection){
        message.textContent ='Tie!';
    }
    //player wins 
    else if((playerSelection === 'ROCK' && computerSelection === 'SCISSORS') || 
        (playerSelection === 'PAPER' && computerSelection === 'ROCK') ||
        (playerSelection === 'SCISSORS' && computerSelection === 'PAPER')){
            updateScore(playerWins + 1, compWins);
        playerWins++;
        message.textContent ='Win!';
        }
    //comp wins 
    else {
        compWins++;
        updateScore(playerWins, compWins);
        message.textContent ='Loss!';
    }
    //display result to UI 
    resultContainer.appendChild(message);

    //check to see if the round is over 
    isRoundOver(numWinsToEnd);
}

/*****************************************************************
USER INTERFACE  
******************************************************************/
const container = document.querySelector('.container');

//Player game components 
const playerGame = document.createElement('div');
playerGame.classList.add('choices');

const playerName = document.createElement('div');
playerName.textContent = window.prompt("Please Enter Your Name", "Bob");
//if player does not enter name, use player 1
if(playerName.textContent === ''){
    playerName.textContent = 'Player 1';
} 

const rock = document.querySelector('#playerRock');
rock.classList.add('player');

const paper = document.querySelector('#playerPaper');
paper.classList.add('player');

const scissors = document.querySelector('#playerScissors');
scissors.classList.add('player');

const playerScore = document.createElement('div');
playerScore.textContent = '0';
playerScore.classList.add('score');

playerGame.appendChild(playerName);
playerGame.appendChild(rock);
playerGame.appendChild(paper);
playerGame.appendChild(scissors);
playerGame.appendChild(playerScore);

//Computer game components 
const compGame = document.createElement('div');
compGame.classList.add('choices');

const computer = document.createElement('div');
computer.textContent ='Computer';

const compRock = document.querySelector('#compRock');

const compPaper = document.querySelector('#compPaper');

const compScissors = document.querySelector('#compScissors');

const compScore = document.createElement('div');
compScore.textContent = '0';
compScore.classList.add('score');

compGame.appendChild(computer);
compGame.appendChild(compRock);
compGame.appendChild(compPaper);
compGame.appendChild(compScissors);
compGame.appendChild(compScore);

//Game Board 
const gameContainer = document.createElement('div');
gameContainer.classList.add('game');
gameContainer.appendChild(playerGame);
gameContainer.appendChild(compGame);

//Round Score and Game Reset Display
const resultContainer = document.createElement('div');
resultContainer.classList.add("result");

const reset = document.createElement('button');
reset.textContent = 'RESET';
reset.classList.add('reset');
const message = document.createElement('p');
message.textContent = "Let's Play!";
resultContainer.appendChild(reset);
resultContainer.appendChild(message);

container.appendChild(gameContainer);
container.appendChild(resultContainer);

//Total Score Display 
const total = document.createElement('div');
total.textContent = `${playerName.textContent} won ${totalWins} of ${totalGames} games`;
total.classList.add('total');
container.appendChild(total);

//checks that color transition has happened to show user and computer selection 
const keys = document.querySelectorAll('svg');
keys.forEach(key => key.addEventListener('transitionend', removeTransition));

/*****************************************************************
Event Listeners
******************************************************************/
rock.addEventListener('click', () => {
    playRound('rock', getComputerChoice());
});
paper.addEventListener('click', () => {
    playRound('paper', getComputerChoice());
});
scissors.addEventListener('click', () => {
        playRound('scissors', getComputerChoice());
});
reset.addEventListener('click', () =>{
    resetGame();
})
