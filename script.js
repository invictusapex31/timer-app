let timerDisplay = document.getElementById("timer");
let alarmSound = document.getElementById("alarm-sound");

let timerDuration = 5 * 60; // default 5 minutes
let remainingTime = timerDuration;
let timerInterval = null;

function updateDisplay(seconds) {
  let hr = Math.floor(seconds / 3600);
  let min = Math.floor((seconds % 3600) / 60);
  let sec = seconds % 60;

  timerDisplay.textContent =
    String(hr).padStart(2, "0") + ":" +
    String(min).padStart(2, "0") + ":" +
    String(sec).padStart(2, "0");
}

function startTimer() {
  if (timerInterval) return; // already running

  timerInterval = setInterval(() => {
    if (remainingTime > 0) {
      remainingTime--;
      updateDisplay(remainingTime);
    } else {
      clearInterval(timerInterval);
      timerInterval = null;
      alarmSound.play(); // play alarm
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

function resetTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
  remainingTime = timerDuration;
  updateDisplay(remainingTime);
  alarmSound.pause();
  alarmSound.currentTime = 0;
}

function setCustomTime() {
  let hours = parseInt(document.getElementById("hoursInput").value) || 0;
  let minutes = parseInt(document.getElementById("minutesInput").value) || 0;

  timerDuration = (hours * 3600) + (minutes * 60);
  if (timerDuration <= 0) return;

  remainingTime = timerDuration;
  updateDisplay(remainingTime);
  resetTimer();
}

// Initialize display
updateDisplay(remainingTime);