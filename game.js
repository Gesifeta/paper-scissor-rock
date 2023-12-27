const readline = require('readline');

/********************************* CONSTANTS *********************************/
const VALID_MOVES = {
  r: {
    name: 'Rock',
    winsAgainst: 's'
  },
  p: {
    name: 'Paper',
    winsAgainst: 'r'
  },
  s: {
    name: 'Scissors',
    winsAgainst: 'p'
  }
};

/********************************* GAME DATA *********************************/
let wins = 0;
let losses = 0;
let ties = 0;

/* DO NOT CHANGE THE CODE ABOVE */

/***************************** HELPER FUNCTIONS ******************************/
function printHelp() {
  // Your code here
  const helpMessage = ["  Type 'r' for Rock",
    "  Type 'p' for Paper",
    "  Type 's' for Scissors",
    "  Type 'q' to quit",
    "  Type 'h' for a list of valid commands\n"]
  return helpMessage.forEach(msg => {
    console.log(msg);
  })
}

function getWinner(move1, move2) {
  // Your code here
  move1 = move1.toLowerCase();
  //check if both moves are equals
  if (move1 === move2) return 0
  //check if the entered values is beatable with AI.
  if (VALID_MOVES[move1].winsAgainst === move2) {

    return 1;
  }

  return -1;

}

function getCPUMove() {
  // Your code here
  //get the possible moves from the valid moves
  const validMoveKeys = Object.keys(VALID_MOVES);
  //get random numbers that matches from number of possible moves
  const randomIndex = Math.floor(Math.random() * validMoveKeys.length);
  //get key for the generetated number.
  const cpu = validMoveKeys[randomIndex];
  return cpu;
}

function processMove(cmd, cpu) {
  // Your code here
  console.log(`You pick ${cmd}, computer picks ${cpu}.`);
  if (cmd === cpu) { // tie
    console.log("You tie.\n");
    ties++;
  }
  else if (VALID_MOVES[cmd].winsAgainst === cpu) { // win
    console.log("You win!\n");
    wins++;
  } else { // loss
    console.log("You lose...\n");
    losses++;
  }

}

/******************************* MAIN FUNCTION *******************************/
function promptInput(rl) {
  console.log(`${wins} wins - ${losses} losses - ${ties} ties`);
  rl.question('> ', (cmd) => {
    cmd = cmd.toLowerCase();
    if (cmd === 'h') {
      //print the game guideline
      printHelp();
    } else if (cmd === 'q') {
      rl.close();
      return;
    } else if (VALID_MOVES[cmd]) {
      const cpu = getCPUMove();
      console.log(`You pick ${cmd}, computer picks ${cpu}.`);
      processMove(cmd, cpu);
    }
    else {
      console.log("\nInvalid command.\n")
    }
    promptInput(rl);
  });
}

/****************************** INITIALIZE GAME ******************************/
function initializeGame() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });
  printHelp();

  promptInput(rl);
}

// start the game if running this file directly, `node game.js`
// do not start the game if running test specs
if (typeof require !== 'undefined' && require.main === module) {
  initializeGame();
}

/**************************************************************************/
/* DO NOT CHANGE THE CODE BELOW */
module.exports = {
  printHelp,
  getWinner,
  getCPUMove,
  processMove,
  promptInput
};