const startButton = document.getElementById("start");
const restButton = document.getElementById("rest");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");
const timerBody = document.getElementById("timer-container");
const timerValue = document.getElementById("timer-value");
const message = document.createElement("p");
const timerSound = new Audio("sound/sound.m4a");

let timeLeft = 1500;
let timerInterval;

function updateTimer() {
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  timerValue.textContent = `${minutes.toString().padStart(2, 0)}:${seconds
    .toString()
    .padStart(2, 0)}`;
}

function startTimer() {
  timerInterval = setInterval(() => {
    timeLeft--;
    updateTimer();
    if (timeLeft === 0) {
      timerSound.play();
      clearInterval(timerInterval);
      startButton.disabled = true;
      stopButton.disabled = true;
      timerBody.appendChild(message);
      message.textContent = "Time is up!";
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function breakTimer() {
  stopTimer();
  timeLeft = 300;
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  timerValue.textContent = `${minutes.toString().padStart(2, 0)}:${seconds
    .toString()
    .padStart(2, 0)}`;
  if (startButton.disabled && stopButton.disabled) {
    startButton.disabled = false;
    stopButton.disabled = false;
    message.remove();
  }
  if (timeLeft === 0) {
    timerSound.play();
    clearInterval(timerInterval);
    startButton.disabled = true;
    stopButton.disabled = true;
    timerBody.appendChild(message);
    message.textContent = "Time is up!";
  }
}

function resetTimer() {
  timeLeft = 1500;
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  stopTimer();
  timerValue.textContent = `${minutes.toString().padStart(2, 0)}:${seconds
    .toString()
    .padStart(2, 0)}`;
  if (startButton.disabled && stopButton.disabled) {
    startButton.disabled = false;
    stopButton.disabled = false;
    message.remove();
  }
}

updateTimer();

startButton.addEventListener("click", startTimer);
stopButton.addEventListener("click", stopTimer);
restButton.addEventListener("click", breakTimer);
resetButton.addEventListener("click", resetTimer);
