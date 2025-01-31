let techniques = [];
let currentIndex = 0;
let intervalSeconds = 15;
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
    let selectedTechniques = getSelectedTechniques();
    if (selectedTechniques.length === 0) return;

    // Shuffle the selected techniques array
    selectedTechniques = shuffleArray(selectedTechniques);

    document.getElementById('techniqueDisplay').innerText = selectedTechniques[currentIndex];
    currentIndex = (currentIndex + 1) % selectedTechniques.length;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function getSelectedTechniques() {
    return Array.from(document.querySelectorAll('#techniquesList input[type="checkbox"]:checked'))
        .map(checkbox => checkbox.value);
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

document.addEventListener('DOMContentLoaded', () => {
    fetch('techniques.json')
        .then(response => response.json())
        .then(data => {
            populateTechniquesList(data);
            startDisplay();
        });
});

function populateTechniquesList(techniques) {
    const listContainer = document.getElementById('techniquesList');
    techniques.forEach(technique => {
        const listItem = document.createElement('div');
        listItem.className = 'list-group-item checkbox';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = technique;
        checkbox.value = technique;
        checkbox.checked = true;

        const label = document.createElement('label');
        label.htmlFor = technique;
        label.appendChild(document.createTextNode(technique));

        listItem.appendChild(checkbox);
        listItem.appendChild(label);
        listContainer.appendChild(listItem);
    });
}

