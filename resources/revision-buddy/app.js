console.clear();
credits();

// REVISION BUDDY

// Quote variables
const quoteElement = document.querySelector('#quote');
const quoteInfo = document.querySelector('#quote-info');
let missingWords = [];

const setsContainer = document.querySelector('.sets');
const statisticsContainer = document.querySelector('.statistics');
const createSetButton = document.querySelector('#create-set-button');
const startButton = document.querySelector('#start-button');

// Pages 
const answerPage = document.querySelector('.answer-page');
const mainPage = document.querySelector('.main-page');
const settingsPage = document.querySelector('.settings-page');

// Settings page
const settingsButton = document.querySelector('#settings-button');
const exitButton = document.querySelector('#exit-button');
const difficultySlider = document.querySelector('#difficulty-slider');

const pages = [mainPage, answerPage, settingsPage];
let currentSet = null;
let chosenSet = null;
let difficulty = 3;
let timeToCompleteSet = 0;

function getTimestampInSeconds () {
    return Math.floor(Date.now() / 1000)
}

function getLocalStorage(itemName) {
    if (localStorage.getItem(itemName) === null) {
        return null
    } else {
        return JSON.parse(localStorage.getItem(itemName));
    }
}

function updateLocalStorage(itemName, key, newValue, list=true) {
    console.log("Updating database");

    let item;

    if (localStorage.getItem(itemName) === null) {
        if (list) {
            item = {[key]: [newValue]};
        } else {
            item = {[key]: newValue};
        }

        localStorage.setItem(itemName, JSON.stringify(item));
    } else {
        item = JSON.parse(localStorage.getItem(itemName));

        if (list) {
            item[key].unshift(newValue)
        } else {
            item[key] = newValue;
        }
    
        localStorage.setItem(itemName, JSON.stringify(item));
    }

    console.log("New value: ", item);

    console.log("Database updated");
}

function showPage(page) {
    pages.forEach((pageItem) => {
        if (page != pageItem) {
            pageItem.style.display = 'none';
        }
    });
    page.style.display = 'flex';
}

function startQuiz() {
    showPage(answerPage);
    scrollToTop();

    timeToCompleteSet = getTimestampInSeconds();
    currentSet = JSON.parse(JSON.stringify(sets[document.querySelector('.set-container.active').getAttribute('set-id')]));

    chooseQuote();
}

function endQuiz() {
    showPage(mainPage);

    let timeTaken = getTimestampInSeconds() - timeToCompleteSet;
    let statistics = {'name': sets[chosenSet].name, 'time': timeTaken}
    updateLocalStorage('revision-buddy-statistics', 'history', statistics, true)
    loadStatistics();
}

function keepFocus() {
    this.focus();
}

function scrollToTop() {
    window.scrollTo(0, 0);
}

function createTextElement(text, highlightStart=false) {
    let highlight = 0;
    if (highlightStart) { highlight = 1; }

    let textContainer = document.createElement('div');
    textContainer.className = 'instruction';

    let textElement = document.createElement('p');
    if (typeof text == 'string') {
        textElement.textContent = text;
    } else if (Array.isArray(text)) {
        for (let i = 0; i < text.length; i++) {
            if (i % 2 == highlight) {
                textElement.innerHTML += text[i];
            } else {
                textElement.innerHTML += `<span class="orange-text">${text[i]}</span>`;
            }
        }
    }

    textContainer.appendChild(textElement);
    return textContainer;
}

function loadSets(container, sets, statistics=false) {
    container.innerHTML = '';

    if (statistics) {
        container.appendChild(createTextElement(['You have completed ', Object.keys(sets).length, ' sets!'], true, false));
    }

    for (const [index, set] of Object.entries(sets)) {
        const setContainer = document.createElement('div');
        setContainer.className = 'set-container';

        const setName = document.createElement('span');
        setName.textContent = set.name;

        const setData = document.createElement('span');

        if (statistics) {
            setName.className = 'set-name';
            setData.textContent = 'Finished in ' + set.time + ' seconds!';
            setData.className = 'set-data';
        } else {
            setName.className = 'set-name cursor-hover';
            setData.textContent = set.quotes.length + ' Cards';
            setData.className = 'set-data cursor-hover';

            setContainer.addEventListener('click', function() {
                document.querySelectorAll('.set-container').forEach((element) => {
                    element.classList.remove('active');
                });
                setContainer.classList.add('active');
                setContainer.setAttribute('set-id', index);
                startButton.classList.add('active');
                chosenSet = index;
            });
        }

        setContainer.appendChild(setName);
        setContainer.appendChild(setData);
        container.appendChild(setContainer);
    };
}

function loadStatistics() {
    let statistics = getLocalStorage('revision-buddy-statistics');

    if (statistics !== null) {
        let setsStatistics = Object.assign({}, ...statistics.history.map((x, index) => ({[index]: {'name': x.name, 'time': x.time}})));
        loadSets(statisticsContainer, setsStatistics, statistics=true);
    } else {
        statisticsContainer.appendChild(createTextElement(['Complete', ' a set to see ', 'statistics', '!'], true, true))
    }
}

loadSets(setsContainer, sets, statistics=false);
loadStatistics();

document.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        if (startButton.classList.contains('active')) {
            startQuiz();
        }
    }
});

startButton.addEventListener('click', () => {
    if (startButton.classList.contains('active')) {
        startQuiz();
    }
})

settingsButton.addEventListener('click', () => {
    showPage(settingsPage);
    scrollToTop();
    difficultySlider.value = 25 * difficulty - 25;
    difficultySlider.nextElementSibling.textContent = difficulty;
})

exitButton.addEventListener('click', () => {
    showPage(mainPage);
    loadSets();
})

difficultySlider.oninput = function() {
	if (difficultySlider.value < 20 && difficultySlider.value >= 0) {
		difficultySlider.value = 0;
        difficulty = 1;
	} else if (difficultySlider.value < 40 && difficultySlider.value >= 20) {
        difficultySlider.value = 25;
        difficulty = 2;
    } else if (difficultySlider.value < 60 && difficultySlider.value >= 40) {
        difficultySlider.value = 50;
        difficulty = 3;
    } else if (difficultySlider.value < 80 && difficultySlider.value >= 60) {
        difficultySlider.value = 75;
        difficulty = 4;
    } else if (difficultySlider.value <= 100 && difficultySlider.value >= 80) {
        difficultySlider.value = 100;
        difficulty = 5;
    }

    difficultySlider.nextElementSibling.textContent = difficulty;
}
