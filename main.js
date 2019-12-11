// Global Variables
var currentMin = 1;
var currentMax = 100;
var correctNumber = createRandomWithinRange(currentMin, currentMax);
var numberOfGuesses = ["+", "+"];
// Query Selectors
// Set Range
var minInput = document.querySelector('#min-range');
var maxInput = document.querySelector('#max-range');
var rangeErrorMessage = document.querySelector('#range-error-message');
var updateButton = document.querySelector('#update-button');
// Guess Form
var minSpan = document.querySelector('#min-span');
var maxSpan = document.querySelector('#max-span');
var nameOneInput = document.querySelector('#name-one-input');
var nameTwoInput = document.querySelector('#name-two-input');
var guessOneInput = document.querySelector('#guess-one-input');
var guessTwoInput = document.querySelector('#guess-two-input');
var guessOneErrorMessage = document.querySelector('#guess-one-error-message');
var guessTwoErrorMessage = document.querySelector('#guess-two-error-message');
var submitButton = document.querySelector('#submit-button');
var clearButton = document.querySelector('#clear-button');
var resetButton = document.querySelector('#reset-button');
// Latest Guess
var latestGuessChallengerOne = document.querySelector('#latest-guess-challenger-one');
var latestGuessChallengerTwo = document.querySelector('#latest-guess-challenger-two');
var latestGuessOne = document.querySelector('#latest-guess-one');
var latestGuessTwo = document.querySelector('#latest-guess-two');
var feedbackMessageOne =document.querySelector('#feedback-message-one');
var feedbackMessageTwo =document.querySelector('#feedback-message-two');
// Winner Card
var winnerCard = document.querySelector('#winner-card');
// var vsNameOne = document.querySelector('#vs-name-one');
// var vsNameTwo = document.querySelector('#vs-name-two');
var vsNameOne = "";
var vsNameTwo = "";
// var winnerName = document.querySelector('#winner-name');
var guessesSpan = document.querySelector('#guesses-span');
var closeButton = document.querySelector('#close-button');

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
// closeButton.addEventListener('click', closeWinnerCard);

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
    plusTenRange();
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
  // guessesSpan.innerText = numberOfGuesses.length; // this enter number of guesses into Winner Summary
  numberOfGuesses.length = 0; // the array reset to default when a game is complete
  setWinner(); // this function will update winner name
  createWinnerCard();
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
  numberOfGuesses = ["+","+"]; // restore game count to default
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
var winnerName = '';

function setWinner() {
  if (parseInt(guessOneInput.value) === correctNumber) {
    winnerName = nameOneInput.value;
  } else if (parseInt(guessTwoInput.value) === correctNumber) {
    winnerName = nameTwoInput.value;
  }
}

// function closeWinnerCard() {
//   winnerCard.remove();
// }

// new code below // add 10 to max and min when game is over
function plusTenRange() {
  currentMin = currentMin - 10;
  currentMax = currentMax + 10;
  correctNumber = createRandomWithinRange(currentMin, currentMax);
  minSpan.innerText = currentMin;
  maxSpan.innerText = currentMax;
}

function createWinnerCard() {
  const div = document.createElement('div');
  div.className = 'winner-card';
  div.innerHTML = `
  <article id="winner-card">
    <div class="row match-up">
      <p id="vs-name-one">${nameOneInput.value}</p>
      <p>vs</p>
      <p id="vs-name-two">${nameTwoInput.value}</p>
    </div>
    <div class="column winner-statement">
      <p id="winner-name">${winnerName}</p>
      <p>winner</p>
    </div>
    <div class="row statistics">
      <p><span id="guesses-span">${numberOfGuesses}.length</span> guesses</p>
      <p><span id="minutes-span">1</span> minutes <span id="seconds-span">35</span> seconds</p>
      <button id="close-button">X</button>
    </div>
  </article>
  `;
  document.querySelector('#card-section').appendChild(div);
}

var cardSection = document.querySelector('#card-section');

cardSection.addEventListener('click', removeWinnerCard);

function removeWinnerCard() {
  if (event.target.classList.contains('#close-button')) {
    // var parent = event.target.closest('.winner-card');
    // parent.remove();
    // cardSection.removeChild(event.target);
  }
}
