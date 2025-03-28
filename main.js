

const storedScore = localStorage.getItem('score');
// Default operator used to set default variable if storedScore is null
const score = JSON.parse(storedScore) || { wins: 0, losses: 0, ties: 0 };

// Automatically update score when page loads
updateScores();

function playGame(playerChoice) {
   let computerChoice = computerMove();
   let result = '';

   switch (playerChoice) {
      case 'Rock': 
         if (computerChoice === `Rock`) {
            result = "It's a Tie!";
         } else if (computerChoice === `Paper`){
            result = `Computer Wins!`;
         } else {
            result = `Player Wins!`;
         }
      break;

      case 'Paper': 
         if (computerChoice === `Paper`) {
            result = "It's a Tie!";
         } else if (computerChoice === `Scissors`) {
            result = `Computer Wins!`;
         } else {
            result = `Player Wins!`;
         }
      break;

      case 'Scissors': 
         if (computerChoice === `Scissors`) {
            result = "It's a Tie!";
         } else if (computerChoice === `Rock`) {
            result = `Computer Wins!`;
         } else {
            result = `Player Wins!`;
         }
      break;
   }

   // Update Score
   if (result === 'Player Wins!') {
      score.wins += 1;
   } else if (result === 'Computer Wins!') {
      score.losses += 1;
   } else if (result === "It's a Tie!") {
      score.ties += 1;
   }

   // Save scores in local storage after done computin
   const scoreString = JSON.stringify(score);
   localStorage.setItem('score', scoreString);
   
   // Get HTML elements
   const resultElement = document.getElementById('result');
   const choicesElement = document.getElementById('choices');

   const choices = `You : ${choiceIcon(playerChoice)}${choiceIcon(computerChoice)}: Computer`;

   resultElement.innerHTML = result;
   choicesElement.innerHTML = choices;

   updateScores();
}

function updateScores() {
   const scoreElement = document.getElementById('scores');
   scoreElement.innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;;
}

function computerMove() {
   let computerChoice = '';

   let random = Math.random(); 

   if (random >= 0 && random< 1/3) {
      computerChoice = 'Rock'
   } else if (random >= 1/3 && random < 2/3) {
      computerChoice = 'Paper'   
   } else {
      computerChoice = 'Scissors'
   }

   return computerChoice;
}

function choiceIcon(choice) {
   switch(choice) {
      case 'Rock': 
         return `<img class="move-icons" src="./imgs/rock-emoji.png" alt="">`;
      case 'Paper': 
         return '<img class="move-icons" src="./imgs/paper-emoji.png" alt="">';
      case 'Scissors': 
         return '<img class="move-icons" src="./imgs/scissors-emoji.png" alt="">';
   }
}

function resetScore(){
   score.ties = 0;
   score.wins = 0;
   score.losses = 0;
   localStorage.removeItem('score');
   // alert(`Scores has been reset!
   // Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`)
   alert('Scores has been reset!');
   updateScores();
}
