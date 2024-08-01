let hours = 0;
let minutes = 0;
let seconds = 0;
let interval;

const hoursDisplayed = document.getElementById('hours');
const minutesDisplayed = document.getElementById('minutes');
const secondsDisplayed = document.getElementById('seconds');
const startButton = document.getElementById('startButton');
const stopButton = document.getElementById('stopButton');
const resetButton = document.getElementById('resetButton');

function startTimer() {
    interval = setInterval(() => {
        seconds++;
        if (seconds >= 60) {
            seconds = 0;
            minutes++;
            if (minutes >= 60) {
                minutes = 0;
                hours++;
            }
        }
        updateDisplay();
    }, 1000);
}

function stopTimer() {
    clearInterval(interval);
}

function resetTimer() {
    clearInterval(interval);
    hours = 0;
    minutes = 0;
    seconds = 0;
    updateDisplay();
}

function updateDisplay() {
    hoursDisplayed.textContent = (hours < 10 ? '0' : '') + hours + ':';
    minutesDisplayed.textContent = (minutes < 10 ? '0' : '') + minutes + ':';
    secondsDisplayed.textContent = (seconds < 10 ? '0' : '') + seconds;
}

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
resetButton.addEventListener('click', resetTimer);