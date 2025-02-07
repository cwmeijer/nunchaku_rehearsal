let techniques = {};
let currentIndex = 0;
let intervalSeconds = 15;
let displayTimer;

document.addEventListener('DOMContentLoaded', () => {
    fetch('techniques.json')
        .then(response => response.json())
        .then(data => {
            techniques = data;
            populateTechniquesList(data);
            startDisplay();
        });
});

function startDisplay() {
    if (displayTimer) clearInterval(displayTimer);
    resetProgressBar();
    displayTechnique();
    displayTimer = setInterval(() => {
        updateProgressBar();
        displayTechnique();
    }, intervalSeconds * 1000);
}

function displayTechnique() {
    if (currentIndex === 0) {
        selectedTechniques = shuffleArray(getSelectedTechniques());
    }

    if (selectedTechniques.length === 0) return;

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
    const selectedBeltColors = Array.from(document.querySelectorAll('#techniquesList input[type="checkbox"]:checked'))
        .map(checkbox => checkbox.value);

    let selectedTechniques = [];
    selectedBeltColors.forEach(color => {
        selectedTechniques = selectedTechniques.concat(techniques[color]);
    });

    return selectedTechniques;
}

function updateSettings() {
    intervalSeconds = parseInt(document.getElementById('interval').value);
    currentIndex = 0; // Reset the current index
    startDisplay(); // Restart the display with the new settings
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

function populateTechniquesList(techniques) {
    const listContainer = document.getElementById('techniquesList');
    listContainer.innerHTML = ''; // Clear existing list

    Object.keys(techniques).forEach(color => {
        const listItem = document.createElement('div');
        listItem.className = 'list-group-item checkbox';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = color;
        checkbox.value = color;
        checkbox.checked = true;

        const label = document.createElement('label');
        label.htmlFor = color;
        label.appendChild(document.createTextNode(color));

        listItem.appendChild(checkbox);
        listItem.appendChild(label);
        listContainer.appendChild(listItem);
    });
}