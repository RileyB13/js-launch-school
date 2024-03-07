const readline = require('readline-sync');
const MESSAGES = require('./loan_calc_msgs.json');
const LANGUAGE = "en";

function prompt(key) {
  let message = MESSAGES[LANGUAGE][key];
  console.log(`--> ${message}`);
}

function invalidAmount(num) {
  return num.trimStart() === '' || Number.isNaN(Number(num)) || Number(num) <= 0;
}

function invalidAPR(num) {
  return invalidAmount(num) || Number(num) >= 100;
}

prompt('welcome');

prompt('getLoanAmount');
let loanAmount = readline.question();
while (invalidAmount(loanAmount)) {
  prompt('validAmount');
  loanAmount = readline.question();
}

prompt('getAPR');
let apr = readline.question();
while (invalidAPR(apr)) {
  prompt('validAPR');
  apr = readline.question();
}

prompt('getLoanDuration');
let loanYearsDuration = readline.question();
while (invalidAmount(loanYearsDuration)) {
  prompt('validLoanDuration');
  loanYearsDuration = readline.question();
}

loanAmount = Number(loanAmount);
let convertedAPR = Number(apr) / 100; //need to get more intentional about using explict type coercion
let monthlyRate = convertedAPR / 12;
let durationInMonths = Number(loanYearsDuration) * 12;

let monthlyBill = loanAmount *
  (monthlyRate /
  (1 - Math.pow((1 + monthlyRate), (-durationInMonths))));

prompt('result');
console.log(`$` + `${monthlyBill.toFixed(2)}`);

prompt('goodbye');
