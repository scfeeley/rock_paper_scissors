
//Gets computer choice for rock,paper,scissors
function getComputerChoice(){
    let num = Math.ceil(Math.random() * 3 );
    if(num === 1){
        return "Rock";
    }else if(num === 2){
        return "Paper";
    }else{
        return "Scissors";
    }
}
//Plays one round of rock,paper,scissors given the player and computer selections
//returns -1 if computer wins, 0 if tie, 1 if player wins
function playRound(playerSelection, computerSelection){
    playerSelection = playerSelection.toUpperCase();
    computerSelection = computerSelection.toUpperCase();
    let message;
    let result;
    if(playerSelection === 'ROCK'){
        if(computerSelection === 'PAPER'){
            message = "You Lose! Paper beats Rock";
            result = -1;
        }else if(computerSelection === 'Rock'){
            message ="You tied!";
            result = 0;
        }else{
            message = "You Win! Rock beats Scissors!";
            result = 1;
        }
    }else if(playerSelection === 'PAPER'){
        if(computerSelection === 'ROCK'){
            message = "You Win! Paper beats Rock";
            result = 1;
        }else if(computerSelection === 'PAPER'){
            message = "You tie!";
            result = 0;
        }else{
            message = "You Lose! Scissors beats Paper!";
            result = -1;
        }
    }else{
        if(computerSelection === 'ROCK'){
            message = "You Lose! Rock beats Scissors";
            result = -1;
        }else if(computerSelection === 'SCISSORS'){
            message =  "You tie!";
            result = 0;
        }else{
            message = "You Win! Scissors beats Paper!";
            result = 1;
        }
    }
    console.log(message);
    return result;
}
//Plays 5 rounds of rock,paper,scissors
function game(){
    let playerWins = 0;
    let compWins = 0; 
    for(let i = 0; i < 5; i++){
        let playerChoice = window.prompt('Choose rock, paper, or scissors');
        let result = playRound(playerChoice, getComputerChoice());
        if(result === 1){
            playerWins++;
        }else if(result === -1){
            compWins++;
        }
    }
    if(playerWins > compWins){
        console.log("You win!");
    }else if(compWins > playerWins){
        console.log("You lose!");
    }else{
        console.log("You tied!");
    }
}

game();