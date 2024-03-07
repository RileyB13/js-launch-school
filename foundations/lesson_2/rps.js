const readline = require('readline-sync');
const CHOICES = ['rock', 'paper', 'scissors', 'lizard', 'spock'];

function checkWinConditions(firstChoice, secondChoice) {
  if ((firstChoice === 'rock' && (secondChoice === 'scissors' || secondChoice === 'lizard'))  ||
      (firstChoice === 'scissors' && (secondChoice === 'paper' || secondChoice === 'lizard')) ||
      (firstChoice === 'paper' && (secondChoice === 'rock' || secondChoice === 'spock')) ||
      (firstChoice === 'spock' && (secondChoice === 'rock' || secondChoice === 'scissors')) ||
      (firstChoice === 'lizard' && (secondChoice === 'paper' || secondChoice === 'spock'))) {
        return true;
      } else {
        return false;
      }
}

let playerWin;
let computerWin;
let playerWinCount = 0;
let computerWinCount = 0;
let round = 1;

function displayWinner(playerChoice, computerChoice) {
  prompt(`You chose ${playerChoice}`);
  prompt(`I chose ${computerChoice}`);

  if (playerWin) {
    prompt('You win!!!');
  } else if (computerWin) {
    prompt('YOU LOSE!!!!');
  } else {
    prompt('We tied...');
  }
}

function winCounter() {
  if (playerWin) {
    playerWinCount += 1;
  } else if (computerWin) {
    computerWinCount += 1;
  }
}

function displayMatchScore() {
  console.log('---OUR BEST OF 5 MATCH RECORD---')
  prompt(`ME:\n${computerWinCount}`)
  prompt(`you...\n${playerWinCount}`)
}

function championDetermined() {
  if (computerWinCount >= 3) {
    prompt('I AM VICTORIOUS')
    return true;
  } else if (playerWinCount >= 3) {
    prompt('It is a game of luck... you were destined to win at some point.')
    return true;
  } else {
    return false;
  }
}

function prompt(msg) {
  console.log(`--> ${msg}`);
}

function playerSelect(playerInput) {
  let selection = CHOICES.filter((word) => word.startsWith(playerInput));
  return selection;
}

function displayRoundBreak() {
  prompt('--------------------------------------------');
  prompt(`------------ROUND--${round}-----------------------`);
  prompt('--------------------------------------------');
}
//- - - - - - - - - - - - - - - Game Loop Begins - - - - - - - - - - - - - - -
while (true) {
  displayRoundBreak();

  prompt(`Choose one: ${CHOICES.join(', ')}`);
  let playerSelectionArray = playerSelect(readline.question().toLowerCase());

  while (playerSelectionArray.length !== 1) {
    if (playerSelectionArray.length > 1) {
      prompt('(Sc)issors and (Sp)ock both start with S.\n--> Type at least one more character so I know which you are choosing.');
    } else {
      prompt('You must choose either (r)ock, (p)aper, (sc)issors, (l)izard, or (sp)ock\n--> Input a valid choice.');
    }
      
    playerSelectionArray = playerSelect(readline.question().toLowerCase());
  }

  let player = playerSelectionArray[0];

  let randomIndex = (Math.floor(Math.random() * CHOICES.length));
  let computer = CHOICES[randomIndex];

  playerWin = checkWinConditions(player, computer);
  computerWin = checkWinConditions(computer, player);
  
  displayWinner(player, computer);
  winCounter();
  displayMatchScore();

  if (championDetermined()) break;

  prompt('Would you like to keep playing? (Y/N)');
  let keepGoing = readline.question()[0].toLowerCase();

  while (!['y', 'n'].includes(keepGoing)) {
    prompt('Please choose Y for (Y)es, or N for (N)o');
    keepGoing = readline.question()[0].toLowerCase();
  }

  if (keepGoing !== 'y') break;

  round += 1;
}

