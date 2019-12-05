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

submitButton.disabled = true;
clearButton.disabled = true;
resetButton.disabled = true;

document.addEventListener('keyup', enableSubmit);
document.addEventListener('keyup', enableClear);
clearButton.addEventListener('click', clearInputs);
submitButton.addEventListener('click', updateLatestGuess);
updateButton.addEventListener('click', updateRange);

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
    document.getElementByID("#submit-button").background = white;
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
  if (currentGuess === correctNumber) {
    feedbackMessage.innerText = "BOOM!";
  } else if (currentGuess > correctNumber) {
    feedbackMessage.innerText = "that's too high";
  } else if (currentGuess < correctNumber) {
    feedbackMessage.innerText = "that's too low";
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
  if (min >= max) {
    errorIcon.style.visibility = 'visible';
    maxRange.style.borderColor = '#dd1972'
  } else {
    errorIcon.style.visibility = 'hidden';
    maxRange.style.border = '1px solid #d0d2d3';
  }
}
