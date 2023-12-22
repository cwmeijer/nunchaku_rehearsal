let techniques = [];
let currentIndex = 0;
let intervalSeconds = 3;
let displayTimer;

document.addEventListener('DOMContentLoaded', () => {
    fetch('techniques.json')
        .then(response => response.json())
        .then(data => {
            techniques = data;
            startDisplay();
        });
});

function startDisplay() {
    if (displayTimer) clearInterval(displayTimer);
    displayTechnique();
    displayTimer = setInterval(displayTechnique, intervalSeconds * 1000);
}

function displayTechnique() {
    if (techniques.length === 0) return;
    document.getElementById('techniqueDisplay').innerText = techniques[currentIndex];
    currentIndex = (currentIndex + 1) % techniques.length;
    resetProgressBar();
}

function updateSettings() {
    intervalSeconds = parseInt(document.getElementById('interval').value);
    startDisplay();
}

function startDisplay() {
    if (displayTimer) clearInterval(displayTimer);
    resetProgressBar();
    displayTechnique();
    displayTimer = setInterval(() => {
        updateProgressBar();
        displayTechnique();
    }, intervalSeconds * 1000);
}


function resetProgressBar() {
    document.getElementById('progressBar').style.width = '0%';
}

function updateProgressBar() {
    let elapsedTime = 0;
    let updateInterval = 100; // Update every 100 milliseconds
    let updateTimer = setInterval(() => {
        elapsedTime += updateInterval;
        let progressPercentage = (elapsedTime / (intervalSeconds * 1000)) * 100;
        document.getElementById('progressBar').style.width = `${progressPercentage}%`;

        if (elapsedTime >= intervalSeconds * 1000) {
            clearInterval(updateTimer);
        }
    }, updateInterval);
}
