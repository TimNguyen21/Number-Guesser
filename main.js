var correctNumber = getRandomRange(1, 100);
var oneName = document.querySelector('#one-name');
var twoName = document.querySelector('#two-name');
var oneGuess = document.querySelector('#one-guess');
var twoGuess = document.querySelector('#two-guess');
var submitButton = document.querySelector('#submit-button');
var clearButton = document.querySelector('#clear-button');
var resetButton = document.querySelector('#reset-button');
var oneChallenger = document.querySelector('#one-challenger');
var twoChallenger = document.querySelector('#two-challenger');
var oneLatestGuess = document.querySelector('#one-latest-guess');
var twoLatestGuess = document.querySelector('#two-latest-guess');
var oneFeedback =document.querySelector('#one-guess-feedback');
var twoFeedback =document.querySelector('#two-guess-feedback');
var minRange = document.querySelector('#min-range');
var maxRange = document.querySelector('#max-range');
var minSpan = document.querySelector('#min-span');
var maxSpan = document.querySelector('#max-span');
var updateButton = document.querySelector('#update-button');
var errorIcon = document.querySelector('#range-error'); // rename ID from error to range-error in HTNL, CSS, JS
var winnerName = document.querySelector('#winner-name');

submitButton.disabled = true;
clearButton.disabled = true;
resetButton.disabled = true;
updateButton.disabled = true;

document.addEventListener('keyup', enableSubmit);
document.addEventListener('keyup', enableClear);
clearButton.addEventListener('click', clearInputs);
submitButton.addEventListener('click', updateLatestGuess);
updateButton.addEventListener('click', updateRange);
document.addEventListener('keyup', checkRange);

function getRandomRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function enableSubmit() {
  var hasOneName = oneName.value !== "";
  var hasTwoName = twoName.value !== "";
  var hasOneGuess = oneGuess.value !== "";
  var hasTwoGuess = twoGuess.value !== "";
  var isFilled = hasOneName && hasTwoName && hasOneGuess && hasTwoGuess;
  if (isFilled) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
}

function enableClear() {
  var hasOneName = oneName.value !== "";
  var hasTwoName = twoName.value !== "";
  var hasOneGuess = oneGuess.value !== "";
  var hasTwoGuess = twoGuess.value !== "";
  var isFilled = hasOneName || hasTwoName || hasOneGuess || hasTwoGuess;
  if (isFilled) {
    clearButton.disabled = false;
  } else {
    clearButton.disabled = true;
  }
}

// New function is found at end of JS Document, discription is provided at th end //
// function clearInputs() {
//   oneName.value = "";
//   twoName.value = "";
//   oneGuess.value = "";
//   twoGuess.value = "";
//   submitButton.disabled = true;
//   clearButton.disabled = true;
// }

function updateLatestGuess() {
  oneChallenger.innerText = oneName.value;
  twoChallenger.innerText = twoName.value;
  oneLatestGuess.innerText = oneGuess.value;
  twoLatestGuess.innerText = twoGuess.value;
  checkGuess(oneGuess, oneFeedback);
  checkGuess(twoGuess, twoFeedback);
  oneGuess.value = "";
  gameCount.push("+"); // oneGuess count
  twoGuess.value = "";
  gameCount.push("+"); // twoGuess count
  submitButton.disabled = true;
  clearButton.disabled = true;
  resetButton.disabled = true;
}

function checkGuess(guessInput, feedbackMessage) {
  var currentGuess = parseInt(guessInput.value);
  if (currentGuess === correctNumber) {
    feedbackMessage.innerText = "BOOM!";
    // Function for updating Winner's Summary
    updateWinner();
    // clear guess form
    clearGuessForm();
    // create new rnadom correctNumber
    newCorrectNumber();
  } else if (currentGuess > correctNumber) {
    feedbackMessage.innerText = "that's too high";
  } else if (currentGuess < correctNumber) {
    feedbackMessage.innerText = "that's too low"
  } else {
    feedbackMessage.innerText = "something went wrong";
  }
}

function updateRange() {
  minSpan.innerText = minRange.value;
  maxSpan.innerText = maxRange.value;
  var min = parseInt(minRange.value);
  var max = parseInt(maxRange.value);
  correctNumber = getRandomRange(min, max);
  // remove clearing of min and max value so that min and max stay consistent throughout game
  // minRange.value = ""; // clear value in min range box after valid update
  // maxRange.value = ""; // clear value in max range box after valid update
}

function checkRange() {
  var min = parseInt(minRange.value);
  var max = parseInt(maxRange.value);
// remove the style when ccs enable/disable property is implemented //
  if (min >= max) {
    errorIcon.style.visibility = 'visible';
    maxRange.style.borderColor = '#dd1972';
  } else {
    errorIcon.style.visibility = 'hidden';
    maxRange.style.border = '1px solid #d0d2d3';
  }
  if (min < max) {
    updateButton.disabled = false;
  } else {
    updateButton.disabled = true;
  }
}

//
// new code below //
var closeButton = document.querySelector('#close-winner-output');
var winnerBox = document.querySelector('.winner-output'); // .player-inputbox line 122-127 html
var playerInputBox = document.querySelectorAll('.player-input-box'); // new ID for Challenger 1 name for Winner Summary line 124 html
var outcomeNameOne = document.querySelector('#outcome-name-one'); // new ID for Challenger 2 name for Winner Summary line 126 html
var outcomeNameTwo = document.querySelector('#outcome-name-two');
var gameCount = ["+", "+"]; // each entry in the array is one game count
var summaryGuesses = document.querySelector('.summary-guesses'); // added new class "summary-guesses" to the line pf guesses in Winner Summary, line 133 html

// var con2 = document.querySelector('.container2'); // ongoing code test

// This function will update information on Winner's Summary //
function updateWinner() {
  outcomeNameOne.innerText = oneName.value;
  outcomeNameTwo.innerText = twoName.value;
  var d1 = winnerBox;
  summaryGuesses.innerText = gameCount.length; // this enter number of guesses into Winner Summary
  gameCount.length = 0; // the array reset to default when a game is complete
  // d1.insertAdjacentHTML('afterend', con2);
}

// Close Winner Summary //
closeButton.addEventListener('click', closeWinnerOutput);

function closeWinnerOutput() {
  winnerBox.remove();
}

// shorter function for clear feature, will comment out intial clear function //
// added class name of playerInput to input textboxes line 50, 58, 71, and 79 in html//
function clearInputs() {
  for (i = 0; i < playerInputBox.length; i++) {
    playerInputBox[i].value = "";
  }
  submitButton.disabled = true;
  clearButton.disabled = true;
}

// this will clear guess form after game is complete
function clearGuessForm() {
  oneName.value = "";
  twoName.value = "";
  oneGuess.innerText = "";
  twoGuess.innerText = "";
}

// this function will generate new correctNumber
function newCorrectNumber() {
  var min = parseInt(minRange.value);
  var max = parseInt(maxRange.value);
  correctNumber = getRandomRange(min, max);
}
