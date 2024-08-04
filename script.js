// script.js

let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapCounter = 0;

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');

function startStop() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(getShowTime, 1);
        startStopButton.textContent = 'Pause';
        startStopButton.style.backgroundColor = '#ffc107';
        running = true;
    } else {
        clearInterval(tInterval);
        difference = new Date().getTime() - startTime;
        startStopButton.textContent = 'Start';
        startStopButton.style.backgroundColor = '#28a745';
        running = false;
    }
}

function reset() {
    clearInterval(tInterval);
    display.textContent = '00:00:00';
    startStopButton.textContent = 'Start';
    startStopButton.style.backgroundColor = '#28a745';
    difference = 0;
    running = false;
    lapCounter = 0;
    lapsContainer.innerHTML = '';
}

function lap() {
    if (running) {
        lapCounter++;
        const lapTime = document.createElement('div');
        lapTime.className = 'lap';
        lapTime.textContent = `Lap ${lapCounter}: ${display.textContent}`;
        lapsContainer.appendChild(lapTime);
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    
    let hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((difference % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((difference % 1000) / 10);
    
    display.textContent =
        (hours > 9 ? hours : '0' + hours) + ':' +
        (minutes > 9 ? minutes : '0' + minutes) + ':' +
        (seconds > 9 ? seconds : '0' + seconds) + ':' +
        (milliseconds > 9 ? milliseconds : '0' + milliseconds);
}

startStopButton.addEventListener('click', startStop);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);
