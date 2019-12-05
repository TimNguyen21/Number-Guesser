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
var errorIcon = document.querySelector('#error');
var winnerName = document.querySelector('#winner-name');
var closeWinnerOutputButton = document.querySelector('#close-winner-output');
var winnerOutput = document.querySelector('.winner-output');

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
closeWinnerOutputButton.addEventListener('click', removeWinnerOutpt);

function removeWinnerOutpt() {
  winnerOutput.remove();
}

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
    // document.querySelector('#submit-button').style.background = white;
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

function clearInputs() {
  oneName.value = "";
  twoName.value = "";
  oneGuess.value = "";
  twoGuess.value = "";
  submitButton.disabled = true;
  clearButton.disabled = true;
}

function updateLatestGuess() {
  oneChallenger.innerText = oneName.value;
  twoChallenger.innerText = twoName.value;
  oneLatestGuess.innerText = oneGuess.value;
  twoLatestGuess.innerText = twoGuess.value;
  checkGuess(oneGuess, oneFeedback);
  checkGuess(twoGuess, twoFeedback);
  oneGuess.value = "";
  twoGuess.value = "";
  submitButton.disabled = true;
  clearButton.disabled = true;
  resetButton.disabled = true;
}

function checkGuess(guessInput, feedbackMessage) {
  var currentGuess = parseInt(guessInput.value);
  var tooHigh = "that's too high";
  var tooLow = "that's too low";
  var perfectGuess = "BOOM!";
  if (currentGuess === correctNumber) {
    feedbackMessage.innerText = perfectGuess;
  } else if (currentGuess > correctNumber) {
    feedbackMessage.innerText = tooHigh;
  } else if (currentGuess < correctNumber) {
    feedbackMessage.innerText = tooLow;
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
  minRange.value = "";
  maxRange.value = "";
  updateButton.disabled = true;
}

function checkRange() {
  var min = parseInt(minRange.value);
  var max = parseInt(maxRange.value);
  if (min >= max) {
    errorIcon.style.visibility = 'visible';
    maxRange.style.borderColor = '#dd1972';
  } else {
    errorIcon.style.visibility = 'hidden';
    maxRange.style.border = '1px solid #d0d2d3';
  }
  if (min < max) {
    updateButton.disabled = false;
    updateButton.style.backgroundColor = '#6e6e6e';
  } else {
    updateButton.disabled = true;
    updateButton.style.backgroundColor = '#d0d2d3';
  }
}
