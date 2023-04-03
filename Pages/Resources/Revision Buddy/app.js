console.clear();
credits();

function round(number, decimalPlaces) {
    return Number(Math.round(number + "e" + decimalPlaces) + "e-" + decimalPlaces)
}


// MongoDB
// const appName = 'data-pddjp';
// const mongoDatabaseURL = `https://data.mongodb-api.com/app/${appName}/endpoint/data/v1/action/`;
// const apiKey = CryptoJS.AES.decrypt("U2FsdGVkX1+dnt/VAVVIedObPfxFarPHuJ6ttji06Qu75SdEpY5hmD+q5TO2xBomem3iDCTVP3eqsj43QrruTKxEZVT5e8/u5LQtbw/ws5gako9dglBL0EIxZEd58T3e", "s2*%z3B2$4Ka").toString(CryptoJS.enc.Utf8);
// let authorisedToken = null;


// async function authorise() {
//     if (authorisedToken === null) {
//         let jsondata = {
//         'key': apiKey
//         }

//         let settings = {
//         "async": true,
//         "crossDomain": true,
//         "method": "POST",
//         "headers": {
//             'Content-Type': 'application/json'
//         },
//         'processData': false,
//         body: JSON.stringify(jsondata)
//         }

//         let response = await (await fetch(`https://realm.mongodb.com/api/client/v2.0/app/${appName}/auth/providers/api-key/login`, settings)).json();
//         authorisedToken = response.access_token;
//     }
//     return authorisedToken;
// }

// async function contactDatabase(action, database, collection, content=false) {
//     let token = await authorise();

//     const jsonData = {
//         'database': database,
//         'collection': collection,
//         'dataSource': 'Sparx',
//     }

//     if (content !== false && action == 'updateOne') {
//         jsonData.filter = { "_id": { "$oid": content[1] } };
//         jsonData.update = content[0];
//     } else if (content !== false && action == 'findOne') {
//         jsonData.filter = content;
//     } else if (content !== false) {
//         jsonData.document = content;
//     }

//     const settings = {
//         "async": true,
//         "crossDomain": true,
//         "method": "POST",
//         headers: {
//             'Authorization': 'Bearer ' + token,
//             'Content-Type': 'application/json'
//         },
//         'processData': false,
//         body: JSON.stringify(jsonData)
//     }

//     response = await (await fetch(mongoDatabaseURL + action, settings)).json();
    
//     return response
// }

// function twoDigits(val) {
//     if (val < 10) {
//         return '0' + val;
//     }
//     return val;
// }

// mongoPostButton.addEventListener('click', () => {
//     let today = new Date();
//     let date = today.getFullYear()+'-'+twoDigits((today.getMonth()+1))+'-'+twoDigits(today.getDate());
//     let time = twoDigits(today.getHours()) + ":" + twoDigits(today.getMinutes()) + ":" + twoDigits(today.getSeconds());
//     let dateTime = date+' '+time;

//     const document = {
//         "Jane Doe": "1234567890",
//         "time": dateTime
//     }
    
//     contactDatabase('insertOne', 'users', 'user-data', document);
// })

// mongoGetUsersButton.addEventListener('click', async () => {
//     console.log(await (await contactDatabase('find', 'users', 'user-data')).documents[0]);
// })

// mongoGetAnswersButton.addEventListener('click', async () => {
//     console.log(await contactDatabase('find', 'answers', 'user-data'));
// })

// mongoFindButton.addEventListener('click', async () => {
//     console.log(await contactDatabase('findOne', 'answers', 'user-data', { "_id": { "$oid": "63e9594bac08792f635e50e7"}})); 
// })

// REVISION BUDDY
const sets = {
    1:  {'name': 'Macbeth Quotes', 'quotes': [
            {'quote': 'Fair is foul, and foul is fair.', 'speaker': 'Three Witches', 'scene': 'Act 1 Scene 1'},
            {'quote': 'Present fears\nAre less than horrible imaginings.', 'speaker': 'King Duncan', 'scene': 'Act 1 Scene 4'},
            {'quote': "There's daggers in men's smiles.", 'speaker': 'Donalbain', 'scene': 'Act 2 Scene 3'},
            {'quote': 'False face must hide what the false heart doth know.', 'speaker': 'Macbeth', 'scene': 'Act 1 Scene 7'},
            {'quote': 'I dare do all that may become a man;\nWho dares do more is none.', 'speaker': 'Macbeth', 'scene': 'Act 1 Scene 7'}]
    },

    2:  {'name': 'An Inspector Calls Quotes', 'quotes': [
            {'quote': "You're squiffy.", 'speaker': 'Sheila', 'scene': 'Act 1'},
            {'quote': "I speak as a hard headed businessman.", 'speaker': 'Mr Birling', 'scene': 'Act 1'},
            {'quote': "Unsinkable, completely unsinkable.", 'speaker': 'Mr Birling', 'scene': 'Act 1'},
            {'quote': "We really must stop these silly pretences.", 'speaker': 'Sheila', 'scene': 'Act 2'},
            {'quote': "Girls of that class.", 'speaker': 'Mrs Birling', 'scene': 'Act 2'},
            {'quote': "She was very pretty - soft brown hair.", 'speaker': 'Gerald', 'scene': 'Act 2'},
            {'quote': "You're not the kind of father a chap could go to when he's in trouble.", 'speaker': 'Eric', 'scene': 'Act 2'},
            {'quote': "We are members of one body. We are responsible for each other.", 'speaker': 'The Inspector', 'scene': 'Act 3'},
            {'quote': "Everything's alright now Sheila.", 'speaker': 'Gerald', 'scene': 'Act 3'},
            {'quote': "Each of you helped to kill her.", 'speaker': 'The Inspector', 'scene': 'Act 3'}]
    }
}

const quoteElement = document.querySelector('#quote');
const quoteInfo = document.querySelector('#quote-info');
const answerPage = document.querySelector('.answer-page');
const mainPage = document.querySelector('.main-page');
const setsContainer = document.querySelector('.sets');
const statisticsContainer = document.querySelector('.statistics');
const createSetButton = document.querySelector('#create-set-button');
const startButton = document.querySelector('#start-button');

let currentSet = null;
let chosenSet = null;
let difficulty = 3;

function startQuiz() {
    mainPage.style.display = 'none';
    answerPage.style.display = 'flex';

    chooseQuote();
}

function endQuiz() {
    answerPage.style.display = 'none';
    mainPage.style.display = 'flex';
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

        let speakerText = document.createElement('p');
        let sceneText = document.createElement('p');

        speakerText.textContent = quote.speaker;
        sceneText.textContent = quote.scene;

        quoteInfo.innerHTML = '';
        quoteInfo.appendChild(speakerText);
        quoteInfo.appendChild(sceneText);
    }

    async function checkInput() {
        document.querySelector('#quote-input.active').addEventListener('blur', keepFocus);

        await sleep(200);
    
        document.querySelector('#quote-input').focus();
    
        while (document.querySelector('#quote-input.active') !== null) {
            let currentQuoteInput = document.querySelector('#quote-input.active');
    
            if (currentQuoteInput.value.toLowerCase() == missingWords[0].toLowerCase()) {
                missingWords.shift();
                currentQuoteInput.removeEventListener('blur', keepFocus);
                currentQuoteInput.classList.remove('active');
    
                if (document.querySelector('#quote-input.active') === null) { chooseQuote(); return }
    
                document.querySelector('#quote-input.active').focus();
                document.querySelector('#quote-input.active').addEventListener('blur', keepFocus);
            }
    
            await sleep(100);
        }
    }

    if (currentSet.quotes.length == 0) { endQuiz(); return; }

    console.log(currentSet.quotes.length)

    let index = Math.floor(Math.random() * currentSet.quotes.length);
    let quote = currentSet.quotes[index];

    currentSet.quotes.splice(index, 1);

    temporaryReturn = removeWords(quote.quote);
    let newQuote = temporaryReturn[0];
    let missingWords = temporaryReturn[1];
    console.log(quote.quote);
    console.log(newQuote.join(''));
    console.log(`${currentSet.quotes.length} quotes remaining!`);

    displayQuote(newQuote);

    await checkInput();
}

function keepFocus() {
    this.focus();
}

function removeWords(quote) {
    let words = splitQuote(quote);

    let missingWordIndexes = getRandomNumbers(difficulty, words);
    let missingWords = [];

    for (let i = 0; i < missingWordIndexes.length; i++) {
        missingWords.push(words[missingWordIndexes[i]]);
        words[missingWordIndexes[i]] = '_'.repeat(words[missingWordIndexes[i]].length);
    }

    return [words, missingWords]
}

function splitQuote(quote) {
    let words = quote.split(/( |\n)/g);
    words = splitItem(words, ';');
    words = splitItem(words, '-');
    words = splitItem(words, ':');
    words = splitItem(words, '&');
    words = splitItem(words, ',');
    words = splitItem(words, '.');
    words = splitItem(words, '!');
    words = splitItem(words, '?');

    return words
}

function onlyIncludes(string, character) {
    for (let i = 0; i < string.length; i++) {
        if (!(string[i].includes(character))) { return false }
    }

    return true
}

function getRandomNumbers(amount, array) {
    let numbers = [];

    if (amount > array.length) {
        amount = array.length;
    }

    while (numbers.length < amount) {
        let number = Math.floor(Math.random() * array.length);

        if (!(numbers.includes(number)) && (!(array[number].includes(';') || array[number].includes(':') || array[number].includes('&') || array[number].includes(',') || array[number].includes('.') || array[number].includes(';') || array[number].includes('!') ||array[number].includes('?') || array[number].includes(' ') || array[number].includes('\n') || array[number].includes('-')))) {
            numbers.push(number);
        }
    }

    return numbers.sort((a,b)=>a-b)
}

function splitItem(array, delimiter) {
    let newArray = [];
    
    for (let i = 0; i < array.length; i++) {
        if (array[i].includes(delimiter)) {
            splitWords = array[i].split(delimiter);
            newArray.push(splitWords[0]);
            newArray.push(delimiter + splitWords[1]);
        } else {
            newArray.push(array[i]);
        }
    }

    return newArray
}

function loadSets() {
    for (const [index, set] of Object.entries(sets)) {
        const setContainer = document.createElement('div');
        setContainer.className = 'set-container';

        const setName = document.createElement('span');
        setName.textContent = set.name;
        setName.className = 'set-name cursor-hover';

        const setData = document.createElement('span');
        setData.textContent = set.quotes.length + ' Cards';
        setData.className = 'set-data cursor-hover';

        setContainer.addEventListener('click', function() {
            document.querySelectorAll('.set-container').forEach((element) => {
                element.classList.remove('active');
            });
            setContainer.classList.add('active');
            startButton.classList.add('active');
            chosenSet = index;
            currentSet = JSON.parse(JSON.stringify(set));
        });

        setContainer.appendChild(setName);
        setContainer.appendChild(setData);
        setsContainer.appendChild(setContainer);
    };
}

loadSets();

startButton.addEventListener('click', () => {
    if (startButton.classList.contains('active')) {
        startQuiz();
    }
})
