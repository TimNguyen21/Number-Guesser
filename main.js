var oneName = document.querySelector('#one-name');
var twoName = document.querySelector('#two-name');
var oneGuess = document.querySelector('#one-guess');
var twoGuess = document.querySelector('#two-guess');
var submitButton = document.querySelector('#submit-button');
var clearButton = document.querySelector('#clear-button');
var oneChallenger = document.querySelector('#one-challenger');
var twoChallenger = document.querySelector('#two-challenger');
var oneLatestGuess = document.querySelector('#one-latest-guess');
var twoLatestGuess = document.querySelector('#two-latest-guess');

submitButton.disabled = true;
clearButton.disabled = true;

document.addEventListener('keyup', enableSubmit);
document.addEventListener('keyup', enableClear);
clearButton.addEventListener('click', clearInputs);
submitButton.addEventListener('click', updateLatestGuess);

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
  oneGuess.value = "";
  twoGuess.value = "";
}
