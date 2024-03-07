//ask the user for the first num
//ask the user for the second num
//ask the user for the operation
//perform the operation
//display the result of the operation

const readline = require('readline-sync');
const MESSAGES = require('./calculator_messages.json');
const LANGUAGE = "en";
let messages = MESSAGES[LANGUAGE];

function prompt(key) {
  let msg = MESSAGES[LANGUAGE][key];
  console.log(`--> ${msg}`);
}


function invalidNumber(doesItNum) {
  return doesItNum.trimStart() === '' || Number.isNaN(Number(doesItNum));
}

prompt('welcome');

let running = true;

while (running) {
  prompt('firstNum');
  let number1 = readline.question();
  while (invalidNumber(number1)) {
    prompt('invalidNum');
    number1 = readline.question();
  }

  prompt('secondNum');
  let number2 = readline.question();
  while (invalidNumber(number2)) {
    prompt('invalidNum');
    number2 = readline.question();
  }

  prompt('whichOp');
  let operation = readline.question();
  while (!['1', '2', '3', '4'].includes(operation)) {
    prompt('invalidOp');
    operation = readline.question();
  }

  let output;
  switch (operation) {
    case '1':
      output = Number(number1) + Number(number2);
      break;
    case '2':
      output = Number(number1) - Number(number2);
      break;
    case '3':
      output = Number(number1) * Number(number2);
      break;
    case '4':
      output = Number(number1) / Number(number2);
      break;
  }

//concat lang messages with output. pulling from json makes interpolation weird with double quotes
  prompt('result');
  console.log(output);

  prompt('moreCalcs');
  let decision = readline.question();
  //need to update includes array in json file for checked language edge cases ie('S'(si) vs 'Y'(yes))
  while (!MESSAGES[LANGUAGE].validDecArray.includes(decision)) {
    prompt('invalidDec');
    decision = readline.question();
  }

  if (decision === MESSAGES[LANGUAGE].validDecArray[1]) {
    running = false;
  }
}

prompt('goodbye');