console.clear();
credits();

function round(number, decimalPlaces) {
    return Number(Math.round(number + "e" + decimalPlaces) + "e-" + decimalPlaces)
}

// REVISION BUDDY
const sets = {
    1:  {'name': 'Macbeth Quotes', 'quotes': [
            {'quote': 'Fair is foul, and foul is fair.', 'info': ['Three Witches', 'Act 1 Scene 1']},
            {'quote': 'Present fears\nAre less than horrible imaginings.', 'info': ['King Duncan', 'Act 1 Scene 4']},
            {'quote': "There's daggers in men's smiles.", 'info': ['Donalbain', 'Act 2 Scene 3']},
            {'quote': 'False face must hide what the false heart doth know.', 'info': ['Macbeth', 'Act 1 Scene 7']},
            {'quote': 'I dare do all that may become a man;\nWho dares do more is none.', 'info': ['Macbeth', 'Act 1 Scene 7']}]
    },

    2:  {'name': 'An Inspector Calls Quotes', 'quotes': [
            {'quote': "You're squiffy.", 'info': ['Sheila', 'Act 1']},
            {'quote': "I speak as a hard headed businessman.", 'info': ['Mr Birling', 'Act 1']},
            {'quote': "Unsinkable, completely unsinkable.", 'info': ['Mr Birling', 'Act 1']},
            {'quote': "We really must stop these silly pretences.", 'info': ['Sheila', 'Act 2']},
            {'quote': "Girls of that class.", 'info': ['Mrs Birling', 'Act 2']},
            {'quote': "She was very pretty - soft brown hair.", 'info': ['Gerald', 'Act 2']},
            {'quote': "You're not the kind of father a chap could go to when he's in trouble.", 'info': ['Eric', 'Act 2']},
            {'quote': "We are members of one body. We are responsible for each other.", 'info': ['The Inspector', 'Act 3']},
            {'quote': "Everything's alright now Sheila.", 'info': ['Gerald', 'Act 3']},
            {'quote': "Each of you helped to kill her.", 'info': ['The Inspector', 'Act 3']}]
    }
}

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

function onlyIncludes(string, character) {
    for (let i = 0; i < string.length; i++) {
        if (!(string[i].includes(character))) { return false }
    }

    return true
}

async function chooseQuote() {
    function displayQuote(newQuote) {
        quoteElement.innerHTML = '';
        let textNode = document.createElement('p');
    
        for (let i = 0; i < newQuote.length; i++) {
            if (onlyIncludes(newQuote[i], '_')) {
                textNode.innerHTML += `<input autocomplete="off" id="quote-input" class="active" type="text" style="width: ${newQuote[i].length}rem" />`
            } else if (newQuote[i] == '\n') {
                textNode.innerHTML += '<br>';
            } else {
                textNode.innerHTML += newQuote[i];
            }
        }
    
        quoteElement.appendChild(textNode);
        quoteInfo.innerHTML = '';

        for (let i = 0; i < quote.info.length; i++) {
            let infoElement = document.createElement('p');
            infoElement.textContent = quote.info[i];
            quoteInfo.appendChild(infoElement);
        }
    }

    function checkInput() {
        if (this.value.toLowerCase() == missingWords[0].toLowerCase()) {
            missingWords.shift();
            this.removeEventListener('blur', keepFocus);
            this.removeEventListener('input', checkInput);
            this.classList.remove('active');

            if (document.querySelector('#quote-input.active') === null) { chooseQuote(); return }

            document.querySelector('#quote-input.active').focus();
            document.querySelector('#quote-input.active').addEventListener('blur', keepFocus);
            document.querySelector('#quote-input.active').addEventListener('input', checkInput);
        }
    }

    if (currentSet.quotes.length == 0) { endQuiz(); return; }

    let index = Math.floor(Math.random() * currentSet.quotes.length);
    let quote = currentSet.quotes[index];

    currentSet.quotes.splice(index, 1);

    let newQuote = new Quote(quote.quote).newQuote;
    console.log(quote.quote);
    console.log(newQuote.join(''));
    console.log(`${currentSet.quotes.length} quotes remaining!`);

    displayQuote(newQuote);

    document.querySelector('#quote-input.active').addEventListener('blur', keepFocus);
    document.querySelector('#quote-input.active').addEventListener('input', checkInput);

    await sleep(200);

    document.querySelector('#quote-input').focus();
}

function keepFocus() {
    this.focus();
}

function scrollToTop() {
    window.scrollTo(0, 0);
}

function createTextElement(text, instruction=true, highlightStart=false) {
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

startButton.addEventListener('click', () => {
    if (startButton.classList.contains('active')) {
        startQuiz();
    }
})

settingsButton.addEventListener('click', () => {
    showPage(settingsPage);
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

class Quote {
    constructor(quote) {
        this.originalQuote = quote;
    }

    get newQuote() {
        return this.removeWords();
    }

    removeWords() {
        function getRandomNumbers(amount, array) {
            function includesItems(string, items) {
                for (let i = 0; i < items.length; i++) {
                    if (string.includes(items[i])) { return true }
                }
            
                return false
            }
    
            let numbers = [];
            let length = 0;
        
            for (let i = 0; i < array.length; i++) {
                if (!(includesItems(array[i], [';', ':', '&', ',', '.', '!', '?', ' ', '\n', '-']))) {
                    length ++;
                }
            }
        
            if (amount + 1 > length) {
                amount = length - 1;
            }
        
            while (numbers.length < amount) {
                let number = Math.floor(Math.random() * array.length);
        
                if (!(numbers.includes(number)) && (!(includesItems(array[number], [';', ':', '&', ',', '.', '!', '?', ' ', '\n', '-'])))) {
                    numbers.push(number);
                }
            }
        
            return numbers.sort((a,b)=>a-b)
        }

        function splitQuote(quote) {
            function splitItem(array, delimiter) {
                let newArray = [];
                
                for (let i = 0; i < array.length; i++) {
                    if (array[i].includes(delimiter)) {
                        let splitWords = array[i].split(delimiter);
                        newArray.push(splitWords[0]);
                        newArray.push(delimiter + splitWords[1]);
                    } else {
                        newArray.push(array[i]);
                    }
                }
            
                return newArray
            }
        
            let words = quote.split(/( |\n)/g);
            words = splitItem(words, ';');
            words = splitItem(words, ':');
            words = splitItem(words, '&');
            words = splitItem(words, ',');
            words = splitItem(words, '.');
            words = splitItem(words, '!');
            words = splitItem(words, '?');
        
            return words
        }
    
        let words = splitQuote(this.originalQuote);
    
        let missingWordIndexes = getRandomNumbers(difficulty, words);
        missingWords = [];
    
        for (let i = 0; i < missingWordIndexes.length; i++) {
            missingWords.push(words[missingWordIndexes[i]]);
            words[missingWordIndexes[i]] = '_'.repeat(words[missingWordIndexes[i]].length);
        }
    
        return words
    }
}