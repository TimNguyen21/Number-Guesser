// Global Variables
var currentMin = 1;
var currentMax = 100;
var correctNumber = createRandomWithinRange(currentMin, currentMax);
var numberOfGuesses = ["+", "+"];
// Query Selectors
// Set Range
var minInput = document.querySelector('#min-range');
var maxInput = document.querySelector('#max-range');
var rangeErrorMessage = document.querySelector('#error-message');
var updateButton = document.querySelector('#update-button');
// Guess Form
var minSpan = document.querySelector('#min-span');
var maxSpan = document.querySelector('#max-span');
var nameOneInput = document.querySelector('#one-name');
var nameTwoInput = document.querySelector('#two-name');
var guessOneInput = document.querySelector('#one-guess');
var guessTwoInput = document.querySelector('#two-guess');
var guessOneErrorMessage = document.querySelector('#range-error-one');
var guessTwoErrorMessage = document.querySelector('#range-error-two');
var submitButton = document.querySelector('#submit-button');
var clearButton = document.querySelector('#clear-button');
var resetButton = document.querySelector('#reset-button');
// Latest Guess
var latestGuessChallengerOne = document.querySelector('#one-challenger');
var latestGuessChallengerTwo = document.querySelector('#two-challenger');
var latestGuessOne = document.querySelector('#one-latest-guess');
var latestGuessTwo = document.querySelector('#two-latest-guess');
var feedbackMessageOne =document.querySelector('#one-guess-feedback');
var feedbackMessageTwo =document.querySelector('#two-guess-feedback');
// Winner Card
var winnerCard = document.querySelector('#winner-card');
var vsNameOne = document.querySelector('#outcome-name-one');
var vsNameTwo = document.querySelector('#outcome-name-two');
var winnerName = document.querySelector('#winner-name');
var guessesSpan = document.querySelector('#summary-guesses');
var closeButton = document.querySelector('#close-winner-output');

// Event Listeners
// Set Range
minInput.addEventListener('click', checkRange);
minInput.addEventListener('keyup', checkRange);
maxInput.addEventListener('click', checkRange);
maxInput.addEventListener('keyup', checkRange);
updateButton.addEventListener('click', updateRange);
// Guess Form
document.addEventListener('keyup', checkWithinRangeOne);
document.addEventListener('keyup', checkWithinRangeTwo);
document.addEventListener('keyup', enableSubmitButton);
document.addEventListener('keyup', enableClearButton);
document.addEventListener('keyup', enableResetButton);
clearButton.addEventListener('click', clearInputs);
submitButton.addEventListener('click', updateLatestGuesses);
resetButton.addEventListener('click', resetGame);
// Winner Card
closeButton.addEventListener('click', closeWinnerCard);

// Statements
submitButton.disabled = true;
clearButton.disabled = true;
resetButton.disabled = true;
updateButton.disabled = true;

// Functions
function createRandomWithinRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// Set Range
function checkRange() {
  if (maxInput.value == '') {
    rangeErrorMessage.style.visibility = "hidden";
    maxInput.classList.remove('error-highlight');
    updateButton.disabled = true;
  } else if (parseInt(minInput.value) < parseInt(maxInput.value)) {
    rangeErrorMessage.style.visibility = "hidden";
    maxInput.classList.remove('error-highlight');
    updateButton.disabled = false;
  } else if (parseInt(minInput.value) >= parseInt(maxInput.value)) {
    rangeErrorMessage.style.visibility = "visible";
    maxInput.classList.add('error-highlight');
    updateButton.disabled = true;
  } else if (minInput.value == '') {
    rangeErrorMessage.style.visibility = "hidden";
    maxInput.classList.remove('error-highlight');
    updateButton.disabled = true;
  }
}

function updateRange() {
  minSpan.innerText = minInput.value;
  maxSpan.innerText = maxInput.value;
  currentMin = parseInt(minInput.value);
  currentMax = parseInt(maxInput.value);
  correctNumber = createRandomWithinRange(currentMin, currentMax);
  minInput.value = ""; // clear value in min range box after valid update
  maxInput.value = ""; // clear value in max range box after valid update
  updateButton.disabled = true;
}
// Guess Form
function checkWithinRangeOne() {
  if (parseInt(guessOneInput.value) < currentMin) {
    guessOneErrorMessage.style.visibility = "visible";
    submitButton.disabled = true;
  } else if (parseInt(guessOneInput.value) > currentMax) {
    guessOneErrorMessage.style.visibility = "visible";
    submitButton.disabled = true;
  } else {
    guessOneErrorMessage.style.visibility = "hidden";
  }
}

function checkWithinRangeTwo() {
  if (parseInt(guessTwoInput.value) < currentMin) {
    guessTwoErrorMessage.style.visibility = "visible";
    submitButton.disabled = true;
  } else if (parseInt(guessTwoInput.value) > currentMax) {
    guessTwoErrorMessage.style.visibility = "visible";
    submitButton.disabled = true;
  } else {
    guessTwoErrorMessage.style.visibility = "hidden";
  }
}

function enableClearButton() {
  var hasOneName = nameOneInput.value !== "";
  var hasTwoName = nameTwoInput.value !== "";
  var hasOneGuess = guessOneInput.value !== "";
  var hasTwoGuess = guessTwoInput.value !== "";
  var isFilled = hasOneName || hasTwoName || hasOneGuess || hasTwoGuess;
  if (isFilled) {
    clearButton.disabled = false;
  } else {
    clearButton.disabled = true;
  }
}

function enableSubmitButton() {
  var hasOneName = nameOneInput.value !== "";
  var hasTwoName = nameTwoInput.value !== "";
  var hasOneGuess = guessOneInput.value !== "";
  var hasTwoGuess = guessTwoInput.value !== "";
  var isFilled = hasOneName && hasTwoName && hasOneGuess && hasTwoGuess;
  if (isFilled) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
}

function enableResetButton() {
  var hasMin = minInput.value !== "";
  var hasMax = maxInput.value !== "";
  var hasOneName = nameOneInput.value !== "";
  var hasTwoName = nameTwoInput.value !== "";
  var hasOneGuess = guessOneInput.value !== "";
  var hasTwoGuess = guessTwoInput.value !== "";
  var isFilled = hasMin || hasMax || hasOneName || hasTwoName || hasOneGuess || hasTwoGuess;
  if (isFilled) {
    resetButton.disabled = false;
  } else {
    resetButton.disabled = true;
  }
}

function clearInputs() {
  nameOneInput.value = "";
  nameTwoInput.value = "";
  guessOneInput.value = "";
  guessTwoInput.value = "";
  submitButton.disabled = true;
  clearButton.disabled = true;
}

function updateLatestGuesses() {
  latestGuessChallengerOne.innerText = nameOneInput.value;
  latestGuessChallengerTwo.innerText = nameTwoInput.value;
  latestGuessOne.innerText = guessOneInput.value;
  latestGuessTwo.innerText = guessTwoInput.value;
  compareGuess(guessOneInput, feedbackMessageOne);
  compareGuess(guessTwoInput, feedbackMessageTwo);
  guessOneInput.value = "";
  numberOfGuesses.push("+"); // guessOneInput count
  guessTwoInput.value = "";
  numberOfGuesses.push("+"); // guessTwoInput count
  submitButton.disabled = true;
  clearButton.disabled = true;
  // resetButton.disabled = true; //reset button remain active becuase it is used to reset game at any time
}

function compareGuess(guessInput, feedbackMessage) {
  var currentGuess = parseInt(guessInput.value);
  if (currentGuess === correctNumber) {
    feedbackMessage.innerText = "BOOM!";
    updateWinner();
    clearGuessInputs();
    correctNumber = createRandomWithinRange(currentMin, currentMax);
  } else if (currentGuess > correctNumber) {
    feedbackMessage.innerText = "that's too high";
  } else if (currentGuess < correctNumber) {
    feedbackMessage.innerText = "that's too low"
  } else {
    feedbackMessage.innerText = "something went wrong";
  }
}

function updateWinner() {
  vsNameOne.innerText = nameOneInput.value;
  vsNameTwo.innerText = nameTwoInput.value;
  guessesSpan.innerText = numberOfGuesses.length; // this enter number of guesses into Winner Summary
  numberOfGuesses.length = 0; // the array reset to default when a game is complete
  setWinner(); // this function will update winner name
}

function clearGuessInputs() {
  nameOneInput.value = "";
  nameTwoInput.value = "";
  guessOneInput.innerText = "";
  guessTwoInput.innerText = "";
}

function resetGame() {
  resetRange();
  clearAllInputs();
  resetLatestGuessField();
  submitButton.disabled = true;
  clearButton.disabled = true;
  updateButton.disabled = true;
  resetButton.disabled = true;
}

function resetRange() {
  currentMin = 1;
  currentMax = 100;
  correctNumber = createRandomWithinRange(currentMin, currentMax);
  minSpan.innerText = "1";
  maxSpan.innerText = "100";
}

function clearAllInputs() {
  nameOneInput.value = "";
  nameTwoInput.value = "";
  guessOneInput.value = "";
  guessTwoInput.value = "";
  minInput.value = "";
  maxInput.value = "";
}

function resetLatestGuessField() {
  latestGuessChallengerOne.innerText = "challenger 1 name";
  latestGuessOne.innerText = "?";
  feedbackMessageOne.innerText = "no guesses yet";
  latestGuessChallengerTwo.innerText = "challenger 2 name";
  latestGuessTwo.innerText = "?";
  feedbackMessageTwo.innerText = "no guesses yet";
 }
// Winner Card
function setWinner() {
  if (parseInt(guessOneInput.value) === correctNumber) {
    winnerName.innerText = nameOneInput.value;
  } else if (parseInt(guessTwoInput.value) === correctNumber) {
    winnerName.innerText = nameTwoInput.value;
  }
}

function closeWinnerCard() {
  winnerCard.remove();
}
