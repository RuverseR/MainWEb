function keepFocus() {
    this.focus();
}

function onlyIncludes(string, character) {
    for (let i = 0; i < string.length; i++) {
        if (!(string[i].includes(character))) { return false }
    }

    return true
}

function includesItems(string, items) {
    for (let i = 0; i < items.length; i++) {
        if (string.includes(items[i])) { return true }
    }

    return false
}

function displayQuote(quote, newQuote) {
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

async function chooseQuote() {
    if (currentSet.quotes.length == 0) { endQuiz(); return; }

    let index = Math.floor(Math.random() * currentSet.quotes.length);
    let quote = currentSet.quotes[index];

    currentSet.quotes.splice(index, 1);

    let newQuote = new Quote(quote.quote).newQuote;
    console.log(quote.quote);
    console.log(newQuote.join(''));
    console.log(`${currentSet.quotes.length} quotes remaining!`);

    displayQuote(quote, newQuote);

    if (document.querySelector('#quote-input.active') !== null) {
        document.querySelector('#quote-input.active').addEventListener('blur', keepFocus);
        document.querySelector('#quote-input.active').addEventListener('input', checkInput);
    
        await sleep(200);
    
        document.querySelector('#quote-input').focus();
    }
}

class Quote {
    constructor(quote) {
        this.originalQuote = quote;
    }

    get newQuote() {
        return this.removeWords();
    }

    splitQuote(quote) {
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

    getRandomNumbers(amount, array) {    
        let numbers = [];
        let length = 0;
    
        for (let i = 0; i < array.length; i++) {
            if (!(includesItems(array[i], [';', ':', '&', ',', '.', '!', '?', ' ', '\n', '-', '(', ')']))) {
                length ++;
            }
        }
    
        if (amount + 1 > length) {
            amount = length - 1;
        }

        if (amount == 0)  {
            amount = 1;
        }
    
        while (numbers.length < amount) {
            let number = Math.floor(Math.random() * array.length);
    
            if (!(numbers.includes(number)) && (!(includesItems(array[number], [';', ':', '&', ',', '.', '!', '?', ' ', '\n', '-', '(', ')'])))) {
                numbers.push(number);
            }
        }
    
        return numbers.sort((a,b)=>a-b)
    }

    removeWords() {    
        let words = this.splitQuote(this.originalQuote);
    
        let missingWordIndexes = this.getRandomNumbers(difficulty, words);
        missingWords = [];
    
        for (let i = 0; i < missingWordIndexes.length; i++) {
            missingWords.push(words[missingWordIndexes[i]]);
            words[missingWordIndexes[i]] = '_'.repeat(words[missingWordIndexes[i]].length);
        }
    
        return words
    }
}
