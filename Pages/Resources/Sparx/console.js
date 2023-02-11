console.log("Script is running");


// THEMES 
const themes = {
    1: {
        'darkest': '#241E92',
        'dark':  '#5432D3',
        'light':  '#7B6CF6',
        'lightest': '#E5A5FF',
    },

    2: {
        'darkest': '#000000',
        'dark':  '#150050',
        'light':  '#3F0071',
        'lightest': '#610094',
    },

    3: {
        'darkest': '#000000',
        'dark':  '#3D0000',
        'light':  '#950101',
        'lightest': '#FF0000',
    }
}


// Colour palette 
document.documentElement.style.setProperty('--darkest', themes[1]['darkest']);
document.documentElement.style.setProperty('--dark', themes[1]['dark']);
document.documentElement.style.setProperty('--light', themes[1]['light']);
document.documentElement.style.setProperty('--lightest', themes[1]['lightest']);

const grey = '#f8f8f7';
const orange = '#f46815';

console.log(JSON.parse(localStorage.getItem('sparx-data')));

const mutationObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        main();
    });
});

mutationObserver.observe(document.documentElement, {
    attributeFilter: [ "class" ],
    characterData: true,
    childList: true,
    subtree: true,
    characterDataOldValue: true
});

async function main() {
    if (document.querySelector('.package-container') !== null) { showThemes(); }

    const xpElement = document.querySelector('.status-bar-label-text') //XP header
    if (xpElement !== null) {
        xpElement.textContent = "It doesn't matter :)";
    } 

    // Display stored answer
    let correctStatusElement = document.querySelector('.page.result .result-inner .correct');
    if (correctStatusElement !== null && document.querySelector('#shown-answer') === null) {
        try {
            const bookworkCodeElement = document.querySelector('.bookwork-code');
            let bookworkCode = bookworkCodeElement.textContent;
            bookworkCode = bookworkCode.replace("Bookwork code: ", '');
            
            const sparxData = JSON.parse(localStorage.getItem('sparx-data'));
            let answer = sparxData[bookworkCode];
            answer = answer.map(element => element.replace('\n', ''));
            answer = answer.map(element => element.replace(/\\\\/g, '\\'));

            // Show saved answer 
            if (document.querySelector('#shown-answer') === null) {
                if (!answer.every(hasCurly)) {
                    const textNode = document.createElement('b');
                    const divNode = document.createElement('div');
                    textNode.innerText = `Stored answer: ${answer.join(', ')}`;
                    textNode.setAttribute('id', 'shown-answer');
                    textNode.style['font-size'] = '2.5rem';

                    divNode.appendChild(textNode);
                    divNode.style['margin-bottom'] = '20px';
                    divNode.style['margin-top'] = '20px';
                    divNode.style.color = grey;
                    document.querySelector('.result-inner').append(divNode);
                } else if (answer.every(hasSource)) {
                    const divNode = document.createElement('div');
                    const imageNode = document.createElement('img');
                    imageNode.src = answer.toString();
                    imageNode.setAttribute('id', 'shown-answer');
                    imageNode.style['height'] = "4rem";

                    divNode.appendChild(imageNode);
                    divNode.style['margin-bottom'] = '20px';
                    divNode.style['margin-top'] = '20px';
                    divNode.style.color = grey;
                    document.querySelector('.location-title').append(divNode);
                } else {
                    let answers = answer.join(', ');

                    const textNode = document.createElement('span');
                    textNode.textContent = `\(${answers}\)`;
                    textNode.style['margin'] = '0.3rem 1rem 0 0';
                    textNode.style['font-size'] = '2.5rem';
                    textNode.style['color'] = 'white';
                    textNode.setAttribute('id', 'shown-answer');

                    const divNode = document.createElement('div');
                    divNode.style['display'] = 'flex';
                    divNode.style['align-items'] = 'center';
                    divNode.style['justify-content'] = 'center';

                    divNode.appendChild(textNode);
                    divNode.style['margin-bottom'] = '20px';
                    divNode.style['margin-top'] = '20px';
                    document.querySelector('.result-inner').append(divNode);

                    katex.render(answers, document.getElementById('custom-answer'), {
                        throwOnError: false
                    });
                }
            }
        } catch(err) {console.log(err)}
    }

    // Display correct bookwork code 
    const bookworkCodeElement = document.querySelector('.wac-text-container .bookwork-code');
    if (bookworkCodeElement !== null && document.querySelector('#custom-answer') === null) {
        try {
            let bookworkCode = bookworkCodeElement.textContent;
            bookworkCode = bookworkCode.replace("Bookwork code: ", '');
            console.log(bookworkCode);

            const sparxData = JSON.parse(localStorage.getItem('sparx-data'));
            let answer = sparxData[bookworkCode];
            answer = answer.map(element => element.replace('\n', ''));
            answer = answer.map(element => element.replace(/\\\\/g, '\\'));
            console.log(answer);

            // Show saved answer 
            if (document.querySelector('#custom-answer') === null) {
                console.log("Trying to show answer...")
                if (!answer.every(hasCurly)) {
                    const textNode = document.createElement('b');
                    const divNode = document.createElement('div');
                    textNode.innerText = `Answer: ${answer.join(', ')}`;
                    textNode.setAttribute('id', 'custom-answer');

                    divNode.appendChild(textNode);
                    divNode.style['margin-bottom'] = '20px';
                    divNode.style.color = grey;
                    document.querySelector('.wac-text-container').append(divNode);
                } else if (answer.every(hasSource)) {
                    const divNode = document.createElement('div');
                    const imageNode = document.createElement('img');
                    imageNode.src = answer.toString();
                    imageNode.setAttribute('id', 'custom-answer');
                    imageNode.style['width'] = "50%";

                    divNode.appendChild(imageNode);
                    divNode.style['margin-bottom'] = '20px';
                    divNode.style.color = grey;
                    document.querySelector('.wac-text-container').append(divNode);
                } else {
                    let answers = answer.join(', ');
                    const textNode = document.createElement('span');
                    textNode.textContent = `\(${answers}\)`;
                    textNode.style['margin'] = '0.3rem 1rem 0 0';
                    textNode.style['color'] = 'white';

                    const divNode = document.createElement('div');
                    divNode.style['display'] = 'flex';
                    divNode.style['align-items'] = 'center';
                    divNode.style['justify-content'] = 'center';
                    textNode.setAttribute('id', 'custom-answer');
                    textNode.style['height'] = '3rem';

                    divNode.appendChild(textNode);
                    divNode.style['margin-bottom'] = '20px';
                    document.querySelector('.wac-text-container').append(divNode);

                    katex.render(answers, document.getElementById('custom-answer'), {
                        throwOnError: false
                    });
                }
            }

            // Get choices 
            answerOptions = document.querySelectorAll('.choice-wac-options .item')
            if (answerOptions !== null) {
                for (let i = 0; i < answerOptions.length; i++) {
                    answerOption = answerOptions[i].textContent;
                    let similarityCount = 0
                    for (let a = 0; a < answer.length; a++) {
                        if (answerOption.includes(answer[a])) {similarityCount++;}
                    }
                    if (similarityCount == answer.length){
                        answerOptions[i].classList.add('bookwork-highlight');
                    }
                    let answerArray = answer.join('');
                    answerArray = answerArray.split('');
                    uniques = answerArray.unique();
                    answerOptions[i].querySelector('.answer-markup.choice-wac-option').classList.add('bookwork-highlight-orange');
                    for (let u = 0; u < uniques.length; u++) {
                        if (!(answerOption.includes(uniques[u]))) {
                            answerOptions[i].querySelector('.answer-markup.choice-wac-option').style.border = 'none';
                        }
                    }
                }
            }

            if (document.querySelector('#custom-answer') === null) {
                const textNode = document.createElement('b');
                const divNode = document.createElement('div');
                textNode.innerText = `If this is shown, then WHY IS THIS NOT WORKING?!`;
                textNode.setAttribute('id', 'custom-answer');

                divNode.appendChild(textNode);
                divNode.style['margin-bottom'] = '20px';
                divNode.style.color = grey;
                document.querySelector('.wac-text-container').append(divNode);
            }
        } catch (err) {console.log(err)}
    }
}


// SUBMITS ANSWER 
document.addEventListener("click", function(e) {
    if(e.target) {
        try {
            if (
                (e.target.id == "skill-delivery-submit-button" && e.target.innerText == "Submit") ||
                (e.target.className == "button-text" && e.target.textContent == "Submit") || 
                (e.target.className == "button-icon button-icon-right" && e.target.parentElement.innerText == "Submit") ||
                (e.target.parentElement.className == "button-icon button-icon-right" && e.target.parentElement.parentElement.innerText == "Submit") ||
                (e.target.parentElement.parentElement.className == "button-icon button-icon-right" && e.target.parentElement.parentElement.parentElement.innerText == "Submit")) {
    
                const bookworkCodeElement = document.querySelector('.bookwork-code');
                let bookworkCode = bookworkCodeElement.textContent;
                bookworkCode = bookworkCode.replace("Bookwork code: ", '');
    
                const answer = getInput(bookworkCode);
                updateDatabase(bookworkCode, answer);
            }
        } catch(err) {}
    }
});

document.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        const submitButton = document.querySelector('#skill-delivery-submit-button');
        if (submitButton !== null) {
            const bookworkCodeElement = document.querySelector('.bookwork-code');
            let bookworkCode = bookworkCodeElement.textContent;
            bookworkCode = bookworkCode.replace("Bookwork code: ", '');

            const answer = getInput(bookworkCode);
            updateDatabase(bookworkCode, answer);
        }
    }
});


// FUNCTIONS

Array.prototype.unique = function() {
    var arr = [];
    for (var i = 0; i < this.length; i++) {
      if (!arr.includes(this[i]) && isDigit(this[i])) {
        arr.push(this[i]);
      }
    }
    return arr;
}

function isDigit(c) {
    return c >= '0' && c <= '9';
}

function updateDatabase(bookworkCode, answer) {
    console.log("Updating database");

    if (localStorage.getItem('sparx-data') === null) {
        const defaultJSON = {"Placeholder": 0};
        localStorage.setItem('sparx-data', JSON.stringify(defaultJSON));
    }

    let sparxData = JSON.parse(localStorage.getItem('sparx-data'));
    sparxData[bookworkCode] = answer;

    console.log("New value: ", sparxData);

    localStorage.setItem('sparx-data', JSON.stringify(sparxData));

    console.log("Database updated");
}

function hasCurly(answer) {
    if (answer.toString().includes('{')  && answer.toString().includes('}')) {
        return true
    } else { return false}
}

function hasSource(answer) {
    if (answer.toString().includes('https') || answer.toString().includes('http')) {
        return true
    } else { return false}
}

function showThemes() {
    if (!(document.querySelector('.themes-container') === null)) { return }

    const container = document.querySelector('.package-container');

    let textNode = document.createElement('b');
    let themesContainer = document.createElement('section');
    let themesList = document.createElement('ul');
    textNode.innerText = 'Themes';
    themesContainer.setAttribute('class', 'themes-container');

    for (const [_, theme] of Object.entries(themes)) {
        let themeNode = document.createElement('li');
        for (const [_, colour] of Object.entries(theme)) {
            let colourNode = document.createElement('div');
            colourNode.style['background-color'] = colour;
            themeNode.appendChild(colourNode);
        };
        themeNode.addEventListener('click', function() {
            console.log("You clicked a theme");
            document.documentElement.style.setProperty('--darkest', theme['darkest']);
            document.documentElement.style.setProperty('--dark', theme['dark']);
            document.documentElement.style.setProperty('--light', theme['light']);
            document.documentElement.style.setProperty('--lightest', theme['lightest']);
        });
        themesList.appendChild(themeNode);
    };

    themesContainer.appendChild(textNode);
    themesContainer.appendChild(themesList);
    container.append(themesContainer);
}

function getInput() {
    let answerData = [];

    // Get input value
    const keypadInputs = document.querySelectorAll('.number-input');
    if (keypadInputs !== null) {
        for (let i = 0; i < keypadInputs.length; i++) {
            inputValue = keypadInputs[i].attributes[10].value;
            answerData.push(inputValue);
        }
    }
    
    // Get choice selected 
    const chosen = document.querySelectorAll('.choice.selected, .gap-card.selected');
    if (chosen !== null) {
        for (let i = 0; i < chosen.length; i++) {
            choice = chosen[i].textContent;
            if (choice.includes('{') && choice.includes('}')) {
                let innerChoice = choice.substring(
                    choice.indexOf("{"), 
                    choice.lastIndexOf("}") + 1
                );
                answerData.push(innerChoice);
            } else if (choice.includes('image')) {
                const imageElement = chosen[i].querySelector('[data-test-target="image-img"]');
                const source = imageElement.currentSrc;
                answerData.push(source.toString());
            } else {
                answerData.push(choice);
            }
        }
    }

    // Get cards selected 
    const cards = document.querySelectorAll('.slots.horizontal .katex');
    if (cards !== null) {
        for (let i = 0; i < cards.length; i++) {
            card = cards[i].textContent;
            if (card.includes('{') && card.includes('}')) {
                let innerCard = card.substring(
                    card.indexOf("{"), 
                    card.lastIndexOf("}") + 1
                );
                answerData.push(innerCard);
            } else {
                answerData.push(card);
            }
        }
    }

    // Get fraction cards selected 
    const slotsFraction = document.querySelector('.slots.fraction');
    if (slotsFraction !== null) {
        const slotsFractions = document.querySelectorAll('.slots.fraction .slot');
        let innerFraction = [];
        for (let i = 0; i < slotsFractions.length; i++) {
            fractionText = slotsFractions[i].textContent;
            let fractionSubstring = fractionText.substring(
                fractionText.indexOf("{"), 
                fractionText.lastIndexOf("}") + 1
            );
            console.log(fractionSubstring);
            innerFraction.push(fractionSubstring);
        }
        fraction = `\\frac${innerFraction[0]}${innerFraction[1]}`;
        answerData.push(fraction);
    }

    // Get cards selected 
    const slotsElement = document.querySelectorAll('.slots .slot .katex');
    if (slotsElement !== null) {
        for (let i = 0; i < slotsElement.length; i++) {
            slotCard = slotsElement[i].textContent;
            if (slotCard.includes('{') && slotCard.includes('}')) {
                let innerCard = slotCard.substring(
                    slotCard.indexOf("{"), 
                    slotCard.lastIndexOf("}") + 1
                );
                answerData.push(innerCard);
            } else {
                answerData.push(card);
            }
        }
    }

    return answerData
}

const themeStyles = '[class~=themes-container] ul li{list-style-type:none;}[class~=themes-container] ul{border-left-width:.125pc;}[class~=themes-container] ul{border-bottom-width:.125pc;}[class~=themes-container] ul li div{background-color:orange;}[class~=themes-container] ul{border-right-width:.125pc;}[class~=themes-container] ul{border-top-width:.125pc;}.themes-container,[class~=themes-container] ul,[class~=themes-container] ul li{display:flex;}[class~=themes-container] ul{border-left-style:solid;}[class~=themes-container] ul{border-bottom-style:solid;}[class~=themes-container] ul{border-right-style:solid;}.themes-container{align-items:center;}[class~=themes-container] ul{border-top-style:solid;}.themes-container{justify-content:center;}.themes-container,[class~=themes-container] ul{flex-direction:column;}[class~=themes-container] ul{border-left-color:white;}[class~=themes-container] ul{border-bottom-color:white;}.themes-container ul li:hover{cursor:pointer;}.themes-container{width:40vw;}[class~=themes-container] ul li div{height:37.5pt;}[class~=themes-container] ul li div{width:25%;}.themes-container ul li:hover{filter:brightness(80%);}[class~=themes-container] ul{border-right-color:white;}[class~=themes-container] ul{border-top-color:white;}[class~=themes-container] ul{border-image:none;}[class~=themes-container] ul{padding-left:0;}[class~=themes-container] ul{padding-bottom:0;}[class~=themes-container] ul{padding-right:0;}[class~=themes-container] ul li{flex-direction:row;}[class~=themes-container] ul{padding-top:0;}[class~=themes-container] ul{width:100%;}@media (max-width: 1000px){[class~=themes-container]{width:60vw;}}'
const darkModeStyles = '[class~=themes-container] ul{border-left-width:1.5pt;}.themes-container ul li{list-style-type:none;}[class~=themes-container] ul{border-bottom-width:1.5pt;}[class~=themes-container],body,.themes-container ul li,[class~=themes-container] ul{display:flex;}[class~=themes-container] ul{border-right-width:1.5pt;}[class~=themes-container] ul{border-top-width:1.5pt;}[class~=themes-container] ul{border-left-style:solid;}[class~=themes-container] ul li div{background-color:orange;}[class~=themes-container] ul{border-bottom-style:solid;}body,[class~=themes-container]{align-items:center;}[class~=themes-container] ul{border-right-style:solid;}[class~=themes-container] ul{border-top-style:solid;}[class~=themes-container] ul{border-left-color:white;}body,[class~=themes-container]{justify-content:center;}[class~=themes-container] ul{border-bottom-color:white;}[class~=themes-container] ul{border-right-color:white;}[class~=themes-container] ul li div{height:37.5pt;}[class~=themes-container] ul{border-top-color:white;}[class~=themes-container] ul{border-image:none;}[class~=themes-container] ul{padding-left:0;}[class~=themes-container] ul li div{width:25%;}[class~=themes-container] ul{padding-bottom:0;}[class~=themes-container] ul{padding-right:0;}.themes-container ul li{flex-direction:row;}[class~=themes-container] ul{padding-top:0;}[class~=themes-container] ul,[class~=themes-container],body{flex-direction:column;}[class~=themes-container] ul{width:100%;}[class~=themes-container] ul li:hover{cursor:pointer;}[class~=themes-container]{width:40vw;}body{box-sizing:border-box;}[class~=themes-container] ul li:hover{filter:brightness(80%);}@media (max-width: 1000px){[class~=themes-container]{width:60vw;}}:root{--orange:#f46815;}:root{--grey:#f8f8f7;}:root{--dark-grey:#e9e9e9;}:root{--darkest:#241e92;}:root{--dark:#5432d3;}:root{--light:#7b6cf6;}[class~=answer-markup][class~=choice-wac-option][class~=choice][class~=choice-answer-markup]{background:var(--grey) !important;}:root{--lightest:#e5a5ff;}[class~=package-container],[class~=um-login-container],[class~=view-body],.main-view{background:var(--darkest) !important;}[class~=package-filter-list],[class~=revision-topic-page],[class~=revision-homework-button-container]{background:var(--dark) !important;}[class~=revision-strand-page],[class~=revision-homework-button],[class~=activity-feed-day],.skill-delivery-view .view-body,[class~=status-bar],[class~=wac-text-container] [class~=bookwork-code],.btn-menu-item,[class~=revision-task],[class~=revision-strand-button],[class~=revision-tab],[class~=answer-only],[class~=um-header],[class~=question-text],[class~=package-heading],[class~=footer-container],[class~=footer-cookie-banner-container],[class~=question-only],[class~=status-bar-label-text]{background:var(--light) !important;}[class~=entry-area-bubble] [class~=text]{color:var(--darkest) !important;}[class~=revision-tabs]{border-bottom-width:medium !important;}[class~=revision-tabs]{border-bottom-style:none !important;}[class~=revision-tabs]{border-bottom-color:var(--light) !important;}[class~=revision-tabs]{border-image:none !important;}[class~=activity-feed-day] > h2{color:var(--grey) !important;}[class~=btn-menu-item]{border-left-width:.75pt !important;}[class~=btn-menu-item]{border-bottom-width:.75pt !important;}[class~=btn-menu-item]{border-right-width:.75pt !important;}[class~=btn-menu-item]{border-top-width:.75pt !important;}[class~=btn-menu-item]{border-left-style:solid !important;}[class~=btn-menu-item]{border-bottom-style:solid !important;}[class~=btn-menu-item]{border-right-style:solid !important;}[class~=btn-menu-item]{border-top-style:solid !important;}[class~=btn-menu-item]{border-left-color:var(--light) !important;}[class~=btn-menu-item]{border-bottom-color:var(--light) !important;}[class~=btn-menu-item]{border-right-color:var(--light) !important;}[class~=btn-menu-item]{border-top-color:var(--light) !important;}[class~=btn-menu-item]{border-image:none !important;}[class~=package-heading]{border-left-width:.75pt !important;}[class~=package-heading]{border-bottom-width:.75pt !important;}[class~=package-heading]{border-right-width:.75pt !important;}[class~=package-heading]{border-top-width:.75pt !important;}[class~=package-heading]{border-left-style:solid !important;}[class~=package-heading]{border-bottom-style:solid !important;}[class~=package-heading]{border-right-style:solid !important;}[class~=package-heading]{border-top-style:solid !important;}[class~=package-heading]{border-left-color:var(--light) !important;}[class~=package-heading]{border-bottom-color:var(--light) !important;}[class~=package-heading]{border-right-color:var(--light) !important;}[class~=package-heading]{border-top-color:var(--light) !important;}[class~=package-heading]{border-image:none !important;}.revision-homework-button{border-left-width:.75pt !important;}.revision-homework-button{border-bottom-width:.75pt !important;}.revision-homework-button{border-right-width:.75pt !important;}.revision-homework-button{border-top-width:.75pt !important;}.package-list > div > span > ul > div{background:var(--dark) !important;}.revision-homework-button{border-left-style:solid !important;}.revision-homework-button{border-bottom-style:solid !important;}.revision-homework-button{border-right-style:solid !important;}.revision-homework-button{border-top-style:solid !important;}.revision-homework-button{border-left-color:var(--light) !important;}.revision-homework-button{border-bottom-color:var(--light) !important;}.revision-homework-button{border-right-color:var(--light) !important;}.revision-homework-button{border-top-color:var(--light) !important;}.revision-homework-button{border-image:none !important;}[class~=choice-wac-options],#answer-wac-box,.um-login-box__content,[class~=accordion-element-header],[class~=activity-feed-work],[class~=status-bar-menu-button],[class~=status-bar-menu-item],[class~=revision-task-item]{background:var(--lightest) !important;}[class~=wac-text-container] [class~=bookwork-code],[class~=status-bar-menu-button]{border-left-width:medium !important;}[class~=status-bar-menu-button],[class~=wac-text-container] [class~=bookwork-code]{border-bottom-width:medium !important;}[class~=wac-text-container] [class~=bookwork-code],[class~=status-bar-menu-button]{border-right-width:medium !important;}[class~=status-bar-menu-button],[class~=wac-text-container] [class~=bookwork-code]{border-top-width:medium !important;}[class~=status-bar-menu-button]{border-left-style:solid !important;}[class~=status-bar-menu-button]{border-bottom-style:solid !important;}[class~=status-bar-menu-button]{border-right-style:solid !important;}[class~=status-bar-menu-button]{border-top-style:solid !important;}[class~=status-bar-menu-button]{border-left-color:var(--lightest) !important;}[class~=wac-text],[class~=revision-topic-page],.school-selector,[class~=result-inner] h2,[class~=revision-homework-button],[class~=wac-header-container],[class~=activity-feed-work],[class~=revision-substrand-extra],[class~=package-heading],[class~=activity-feed-work-counts],[class~=accordion-element-header],[class~=btn-menu-item],[class~=question-text] > div > [class~=text],.text-container,[class~=revision-strand-button],[class~=revision-location-stream]{color:var(--grey) !important;}[class~=status-bar-menu-button]{border-bottom-color:var(--lightest) !important;}[class~=status-bar-menu-button]{border-right-color:var(--lightest) !important;}[class~=status-bar-menu-button]{border-top-color:var(--lightest) !important;}[class~=status-bar-menu-button]{border-image:none !important;}[class~=status-bar-menu-item]{border-left-color:var(--lightest) !important;}[class~=status-bar-menu-item]{border-bottom-color:var(--lightest) !important;}[class~=status-bar-menu-item]{border-right-color:var(--lightest) !important;}[class~=status-bar-menu-item]{border-top-color:var(--lightest) !important;}[class~=package-list] > div > span > ul > div > [class~=task-title]{color:var(--dark-grey) !important;}[class~=choice-text]{background:var(--grey) !important;}.active,[class~=revision-strand-button],[class~=revision-location-stream]{border-left-color:var(--grey) !important;}[class~=revision-strand-button],[class~=revision-location-stream],.active{border-bottom-color:var(--grey) !important;}[class~=revision-location-stream],[class~=revision-strand-button],.active{border-right-color:var(--grey) !important;}[class~=revision-location-stream],[class~=revision-strand-button],.active{border-top-color:var(--grey) !important;}.active{border-left-width:.0625pc !important;}.active{border-bottom-width:.0625pc !important;}.active{border-right-width:.0625pc !important;}.active{border-top-width:.0625pc !important;}.active{border-left-style:solid !important;}.active{border-bottom-style:solid !important;}.active{border-right-style:solid !important;}.active{border-top-style:solid !important;}.active{border-image:none !important;}.package-filter-arrow{border-left-color:var(--grey) !important;}[class~=bookwork-highlight]{border-left-width:3.75pt;}[class~=bookwork-highlight]{border-bottom-width:3.75pt;}[class~=bookwork-highlight]{border-right-width:3.75pt;}[class~=bookwork-highlight]{border-top-width:3.75pt;}[class~=wac-text-container] [class~=bookwork-code]{border-left-style:none !important;}[class~=wac-text-container] [class~=bookwork-code]{border-bottom-style:none !important;}[class~=bookwork-highlight]{border-left-style:solid;}[class~=bookwork-highlight]{border-bottom-style:solid;}[class~=bookwork-highlight]{border-right-style:solid;}[class~=bookwork-highlight]{border-top-style:solid;}[class~=bookwork-highlight]{border-left-color:var(--light);}[class~=bookwork-highlight]{border-bottom-color:var(--light);}[class~=bookwork-highlight]{border-right-color:var(--light);}[class~=wac-text-container] [class~=bookwork-code]{border-right-style:none !important;}[class~=bookwork-highlight]{border-top-color:var(--light);}[class~=bookwork-highlight]{border-image:none;}[class~=bookwork-highlight-orange]{border-left-width:.052083333in;}[class~=bookwork-highlight-orange]{border-bottom-width:.052083333in;}[class~=bookwork-highlight-orange]{border-right-width:.052083333in;}[class~=bookwork-highlight-orange]{border-top-width:.052083333in;}[class~=bookwork-highlight-orange]{border-left-style:solid;}[class~=bookwork-highlight-orange]{border-bottom-style:solid;}[class~=bookwork-highlight-orange]{border-right-style:solid;}[class~=bookwork-highlight-orange]{border-top-style:solid;}[class~=wac-text-container] [class~=bookwork-code]{border-top-style:none !important;}[class~=bookwork-highlight-orange]{border-left-color:var(--orange);}[class~=wac-text-container] [class~=bookwork-code]{border-left-color:currentColor !important;}[class~=bookwork-highlight-orange]{border-bottom-color:var(--orange);}[class~=bookwork-highlight-orange]{border-right-color:var(--orange);}[class~=bookwork-highlight-orange]{border-top-color:var(--orange);}[class~=bookwork-highlight-orange]{border-image:none;}[class~=dummytaskitem]{border-left-width:medium !important;}[class~=dummytaskitem]{border-bottom-width:medium !important;}[class~=dummytaskitem]{border-right-width:medium !important;}[class~=dummytaskitem]{border-top-width:medium !important;}[class~=dummytaskitem],[class~=wac-text-container] [class~=bookwork-code]{border-bottom-color:currentColor !important;}[class~=dummytaskitem]{border-left-style:none !important;}[class~=dummytaskitem]{border-bottom-style:none !important;}[class~=dummytaskitem]{border-right-style:none !important;}[class~=dummytaskitem]{border-top-style:none !important;}[class~=dummytaskitem]{border-left-color:currentColor !important;}[class~=wac-text-container] [class~=bookwork-code],[class~=dummytaskitem]{border-right-color:currentColor !important;}[class~=wac-text-container] [class~=bookwork-code],[class~=dummytaskitem]{border-top-color:currentColor !important;}[class~=wac-text-container] [class~=bookwork-code],[class~=dummytaskitem]{border-image:none !important;}.result-inner h1.incorrect,[class~=answer-part] > div > [class~=text],[class~=minigame-description] > div,[class~=result-inner] [class~=result-subtitle-prominent]{color:var(--grey) !important;}.revision-tab.revision-tab-active{background:var(--lightest) !important;}[class~=selected] [class~=text]{color:var(--orange) !important;}[class~=package-list] > div > span > ul > div{border-left-color:var(--dark) !important;}[class~=package-list] > div > span > ul > div{border-bottom-color:var(--dark) !important;}[class~=package-list] > div > span > ul > div{border-right-color:var(--dark) !important;}[class~=package-list] > div > span > ul > div{border-top-color:var(--dark) !important;}'
const katexStyles = '@font-face{font-family:KaTeX_AMS;font-style:normal;font-weight:400;src:url(fonts/KaTeX_AMS-Regular.woff2) format("woff2"),url(fonts/KaTeX_AMS-Regular.woff) format("woff"),url(fonts/KaTeX_AMS-Regular.ttf) format("truetype")}@font-face{font-family:KaTeX_Caligraphic;font-style:normal;font-weight:700;src:url(fonts/KaTeX_Caligraphic-Bold.woff2) format("woff2"),url(fonts/KaTeX_Caligraphic-Bold.woff) format("woff"),url(fonts/KaTeX_Caligraphic-Bold.ttf) format("truetype")}@font-face{font-family:KaTeX_Caligraphic;font-style:normal;font-weight:400;src:url(fonts/KaTeX_Caligraphic-Regular.woff2) format("woff2"),url(fonts/KaTeX_Caligraphic-Regular.woff) format("woff"),url(fonts/KaTeX_Caligraphic-Regular.ttf) format("truetype")}@font-face{font-family:KaTeX_Fraktur;font-style:normal;font-weight:700;src:url(fonts/KaTeX_Fraktur-Bold.woff2) format("woff2"),url(fonts/KaTeX_Fraktur-Bold.woff) format("woff"),url(fonts/KaTeX_Fraktur-Bold.ttf) format("truetype")}@font-face{font-family:KaTeX_Fraktur;font-style:normal;font-weight:400;src:url(fonts/KaTeX_Fraktur-Regular.woff2) format("woff2"),url(fonts/KaTeX_Fraktur-Regular.woff) format("woff"),url(fonts/KaTeX_Fraktur-Regular.ttf) format("truetype")}@font-face{font-family:KaTeX_Main;font-style:normal;font-weight:700;src:url(fonts/KaTeX_Main-Bold.woff2) format("woff2"),url(fonts/KaTeX_Main-Bold.woff) format("woff"),url(fonts/KaTeX_Main-Bold.ttf) format("truetype")}@font-face{font-family:KaTeX_Main;font-style:italic;font-weight:700;src:url(fonts/KaTeX_Main-BoldItalic.woff2) format("woff2"),url(fonts/KaTeX_Main-BoldItalic.woff) format("woff"),url(fonts/KaTeX_Main-BoldItalic.ttf) format("truetype")}@font-face{font-family:KaTeX_Main;font-style:italic;font-weight:400;src:url(fonts/KaTeX_Main-Italic.woff2) format("woff2"),url(fonts/KaTeX_Main-Italic.woff) format("woff"),url(fonts/KaTeX_Main-Italic.ttf) format("truetype")}@font-face{font-family:KaTeX_Main;font-style:normal;font-weight:400;src:url(fonts/KaTeX_Main-Regular.woff2) format("woff2"),url(fonts/KaTeX_Main-Regular.woff) format("woff"),url(fonts/KaTeX_Main-Regular.ttf) format("truetype")}@font-face{font-family:KaTeX_Math;font-style:italic;font-weight:700;src:url(fonts/KaTeX_Math-BoldItalic.woff2) format("woff2"),url(fonts/KaTeX_Math-BoldItalic.woff) format("woff"),url(fonts/KaTeX_Math-BoldItalic.ttf) format("truetype")}@font-face{font-family:KaTeX_Math;font-style:italic;font-weight:400;src:url(fonts/KaTeX_Math-Italic.woff2) format("woff2"),url(fonts/KaTeX_Math-Italic.woff) format("woff"),url(fonts/KaTeX_Math-Italic.ttf) format("truetype")}@font-face{font-family:"KaTeX_SansSerif";font-style:normal;font-weight:700;src:url(fonts/KaTeX_SansSerif-Bold.woff2) format("woff2"),url(fonts/KaTeX_SansSerif-Bold.woff) format("woff"),url(fonts/KaTeX_SansSerif-Bold.ttf) format("truetype")}@font-face{font-family:"KaTeX_SansSerif";font-style:italic;font-weight:400;src:url(fonts/KaTeX_SansSerif-Italic.woff2) format("woff2"),url(fonts/KaTeX_SansSerif-Italic.woff) format("woff"),url(fonts/KaTeX_SansSerif-Italic.ttf) format("truetype")}@font-face{font-family:"KaTeX_SansSerif";font-style:normal;font-weight:400;src:url(fonts/KaTeX_SansSerif-Regular.woff2) format("woff2"),url(fonts/KaTeX_SansSerif-Regular.woff) format("woff"),url(fonts/KaTeX_SansSerif-Regular.ttf) format("truetype")}@font-face{font-family:KaTeX_Script;font-style:normal;font-weight:400;src:url(fonts/KaTeX_Script-Regular.woff2) format("woff2"),url(fonts/KaTeX_Script-Regular.woff) format("woff"),url(fonts/KaTeX_Script-Regular.ttf) format("truetype")}@font-face{font-family:KaTeX_Size1;font-style:normal;font-weight:400;src:url(fonts/KaTeX_Size1-Regular.woff2) format("woff2"),url(fonts/KaTeX_Size1-Regular.woff) format("woff"),url(fonts/KaTeX_Size1-Regular.ttf) format("truetype")}@font-face{font-family:KaTeX_Size2;font-style:normal;font-weight:400;src:url(fonts/KaTeX_Size2-Regular.woff2) format("woff2"),url(fonts/KaTeX_Size2-Regular.woff) format("woff"),url(fonts/KaTeX_Size2-Regular.ttf) format("truetype")}@font-face{font-family:KaTeX_Size3;font-style:normal;font-weight:400;src:url(fonts/KaTeX_Size3-Regular.woff2) format("woff2"),url(fonts/KaTeX_Size3-Regular.woff) format("woff"),url(fonts/KaTeX_Size3-Regular.ttf) format("truetype")}@font-face{font-family:KaTeX_Size4;font-style:normal;font-weight:400;src:url(fonts/KaTeX_Size4-Regular.woff2) format("woff2"),url(fonts/KaTeX_Size4-Regular.woff) format("woff"),url(fonts/KaTeX_Size4-Regular.ttf) format("truetype")}@font-face{font-family:KaTeX_Typewriter;font-style:normal;font-weight:400;src:url(fonts/KaTeX_Typewriter-Regular.woff2) format("woff2"),url(fonts/KaTeX_Typewriter-Regular.woff) format("woff"),url(fonts/KaTeX_Typewriter-Regular.ttf) format("truetype")}.katex{text-rendering:auto;font:normal 1.21em KaTeX_Main,Times New Roman,serif;line-height:1.2;text-indent:0}.katex *{-ms-high-contrast-adjust:none!important;border-color:currentColor}.katex .katex-version:after{content:"0.16.4"}.katex .katex-mathml{clip:rect(1px,1px,1px,1px);border:0;height:1px;overflow:hidden;padding:0;position:absolute;width:1px}.katex .katex-html>.newline{display:block}.katex .base{position:relative;white-space:nowrap;width:-webkit-min-content;width:-moz-min-content;width:min-content}.katex .base,.katex .strut{display:inline-block}.katex .textbf{font-weight:700}.katex .textit{font-style:italic}.katex .textrm{font-family:KaTeX_Main}.katex .textsf{font-family:KaTeX_SansSerif}.katex .texttt{font-family:KaTeX_Typewriter}.katex .mathnormal{font-family:KaTeX_Math;font-style:italic}.katex .mathit{font-family:KaTeX_Main;font-style:italic}.katex .mathrm{font-style:normal}.katex .mathbf{font-family:KaTeX_Main;font-weight:700}.katex .boldsymbol{font-family:KaTeX_Math;font-style:italic;font-weight:700}.katex .amsrm,.katex .mathbb,.katex .textbb{font-family:KaTeX_AMS}.katex .mathcal{font-family:KaTeX_Caligraphic}.katex .mathfrak,.katex .textfrak{font-family:KaTeX_Fraktur}.katex .mathtt{font-family:KaTeX_Typewriter}.katex .mathscr,.katex .textscr{font-family:KaTeX_Script}.katex .mathsf,.katex .textsf{font-family:KaTeX_SansSerif}.katex .mathboldsf,.katex .textboldsf{font-family:KaTeX_SansSerif;font-weight:700}.katex .mathitsf,.katex .textitsf{font-family:KaTeX_SansSerif;font-style:italic}.katex .mainrm{font-family:KaTeX_Main;font-style:normal}.katex .vlist-t{border-collapse:collapse;display:inline-table;table-layout:fixed}.katex .vlist-r{display:table-row}.katex .vlist{display:table-cell;position:relative;vertical-align:bottom}.katex .vlist>span{display:block;height:0;position:relative}.katex .vlist>span>span{display:inline-block}.katex .vlist>span>.pstrut{overflow:hidden;width:0}.katex .vlist-t2{margin-right:-2px}.katex .vlist-s{display:table-cell;font-size:1px;min-width:2px;vertical-align:bottom;width:2px}.katex .vbox{align-items:baseline;display:inline-flex;flex-direction:column}.katex .hbox{width:100%}.katex .hbox,.katex .thinbox{display:inline-flex;flex-direction:row}.katex .thinbox{max-width:0;width:0}.katex .msupsub{text-align:left}.katex .mfrac>span>span{text-align:center}.katex .mfrac .frac-line{border-bottom-style:solid;display:inline-block;width:100%}.katex .hdashline,.katex .hline,.katex .mfrac .frac-line,.katex .overline .overline-line,.katex .rule,.katex .underline .underline-line{min-height:1px}.katex .mspace{display:inline-block}.katex .clap,.katex .llap,.katex .rlap{position:relative;width:0}.katex .clap>.inner,.katex .llap>.inner,.katex .rlap>.inner{position:absolute}.katex .clap>.fix,.katex .llap>.fix,.katex .rlap>.fix{display:inline-block}.katex .llap>.inner{right:0}.katex .clap>.inner,.katex .rlap>.inner{left:0}.katex .clap>.inner>span{margin-left:-50%;margin-right:50%}.katex .rule{border:0 solid;display:inline-block;position:relative}.katex .hline,.katex .overline .overline-line,.katex .underline .underline-line{border-bottom-style:solid;display:inline-block;width:100%}.katex .hdashline{border-bottom-style:dashed;display:inline-block;width:100%}.katex .sqrt>.root{margin-left:.27777778em;margin-right:-.55555556em}.katex .fontsize-ensurer.reset-size1.size1,.katex .sizing.reset-size1.size1{font-size:1em}.katex .fontsize-ensurer.reset-size1.size2,.katex .sizing.reset-size1.size2{font-size:1.2em}.katex .fontsize-ensurer.reset-size1.size3,.katex .sizing.reset-size1.size3{font-size:1.4em}.katex .fontsize-ensurer.reset-size1.size4,.katex .sizing.reset-size1.size4{font-size:1.6em}.katex .fontsize-ensurer.reset-size1.size5,.katex .sizing.reset-size1.size5{font-size:1.8em}.katex .fontsize-ensurer.reset-size1.size6,.katex .sizing.reset-size1.size6{font-size:2em}.katex .fontsize-ensurer.reset-size1.size7,.katex .sizing.reset-size1.size7{font-size:2.4em}.katex .fontsize-ensurer.reset-size1.size8,.katex .sizing.reset-size1.size8{font-size:2.88em}.katex .fontsize-ensurer.reset-size1.size9,.katex .sizing.reset-size1.size9{font-size:3.456em}.katex .fontsize-ensurer.reset-size1.size10,.katex .sizing.reset-size1.size10{font-size:4.148em}.katex .fontsize-ensurer.reset-size1.size11,.katex .sizing.reset-size1.size11{font-size:4.976em}.katex .fontsize-ensurer.reset-size2.size1,.katex .sizing.reset-size2.size1{font-size:.83333333em}.katex .fontsize-ensurer.reset-size2.size2,.katex .sizing.reset-size2.size2{font-size:1em}.katex .fontsize-ensurer.reset-size2.size3,.katex .sizing.reset-size2.size3{font-size:1.16666667em}.katex .fontsize-ensurer.reset-size2.size4,.katex .sizing.reset-size2.size4{font-size:1.33333333em}.katex .fontsize-ensurer.reset-size2.size5,.katex .sizing.reset-size2.size5{font-size:1.5em}.katex .fontsize-ensurer.reset-size2.size6,.katex .sizing.reset-size2.size6{font-size:1.66666667em}.katex .fontsize-ensurer.reset-size2.size7,.katex .sizing.reset-size2.size7{font-size:2em}.katex .fontsize-ensurer.reset-size2.size8,.katex .sizing.reset-size2.size8{font-size:2.4em}.katex .fontsize-ensurer.reset-size2.size9,.katex .sizing.reset-size2.size9{font-size:2.88em}.katex .fontsize-ensurer.reset-size2.size10,.katex .sizing.reset-size2.size10{font-size:3.45666667em}.katex .fontsize-ensurer.reset-size2.size11,.katex .sizing.reset-size2.size11{font-size:4.14666667em}.katex .fontsize-ensurer.reset-size3.size1,.katex .sizing.reset-size3.size1{font-size:.71428571em}.katex .fontsize-ensurer.reset-size3.size2,.katex .sizing.reset-size3.size2{font-size:.85714286em}.katex .fontsize-ensurer.reset-size3.size3,.katex .sizing.reset-size3.size3{font-size:1em}.katex .fontsize-ensurer.reset-size3.size4,.katex .sizing.reset-size3.size4{font-size:1.14285714em}.katex .fontsize-ensurer.reset-size3.size5,.katex .sizing.reset-size3.size5{font-size:1.28571429em}.katex .fontsize-ensurer.reset-size3.size6,.katex .sizing.reset-size3.size6{font-size:1.42857143em}.katex .fontsize-ensurer.reset-size3.size7,.katex .sizing.reset-size3.size7{font-size:1.71428571em}.katex .fontsize-ensurer.reset-size3.size8,.katex .sizing.reset-size3.size8{font-size:2.05714286em}.katex .fontsize-ensurer.reset-size3.size9,.katex .sizing.reset-size3.size9{font-size:2.46857143em}.katex .fontsize-ensurer.reset-size3.size10,.katex .sizing.reset-size3.size10{font-size:2.96285714em}.katex .fontsize-ensurer.reset-size3.size11,.katex .sizing.reset-size3.size11{font-size:3.55428571em}.katex .fontsize-ensurer.reset-size4.size1,.katex .sizing.reset-size4.size1{font-size:.625em}.katex .fontsize-ensurer.reset-size4.size2,.katex .sizing.reset-size4.size2{font-size:.75em}.katex .fontsize-ensurer.reset-size4.size3,.katex .sizing.reset-size4.size3{font-size:.875em}.katex .fontsize-ensurer.reset-size4.size4,.katex .sizing.reset-size4.size4{font-size:1em}.katex .fontsize-ensurer.reset-size4.size5,.katex .sizing.reset-size4.size5{font-size:1.125em}.katex .fontsize-ensurer.reset-size4.size6,.katex .sizing.reset-size4.size6{font-size:1.25em}.katex .fontsize-ensurer.reset-size4.size7,.katex .sizing.reset-size4.size7{font-size:1.5em}.katex .fontsize-ensurer.reset-size4.size8,.katex .sizing.reset-size4.size8{font-size:1.8em}.katex .fontsize-ensurer.reset-size4.size9,.katex .sizing.reset-size4.size9{font-size:2.16em}.katex .fontsize-ensurer.reset-size4.size10,.katex .sizing.reset-size4.size10{font-size:2.5925em}.katex .fontsize-ensurer.reset-size4.size11,.katex .sizing.reset-size4.size11{font-size:3.11em}.katex .fontsize-ensurer.reset-size5.size1,.katex .sizing.reset-size5.size1{font-size:.55555556em}.katex .fontsize-ensurer.reset-size5.size2,.katex .sizing.reset-size5.size2{font-size:.66666667em}.katex .fontsize-ensurer.reset-size5.size3,.katex .sizing.reset-size5.size3{font-size:.77777778em}.katex .fontsize-ensurer.reset-size5.size4,.katex .sizing.reset-size5.size4{font-size:.88888889em}.katex .fontsize-ensurer.reset-size5.size5,.katex .sizing.reset-size5.size5{font-size:1em}.katex .fontsize-ensurer.reset-size5.size6,.katex .sizing.reset-size5.size6{font-size:1.11111111em}.katex .fontsize-ensurer.reset-size5.size7,.katex .sizing.reset-size5.size7{font-size:1.33333333em}.katex .fontsize-ensurer.reset-size5.size8,.katex .sizing.reset-size5.size8{font-size:1.6em}.katex .fontsize-ensurer.reset-size5.size9,.katex .sizing.reset-size5.size9{font-size:1.92em}.katex .fontsize-ensurer.reset-size5.size10,.katex .sizing.reset-size5.size10{font-size:2.30444444em}.katex .fontsize-ensurer.reset-size5.size11,.katex .sizing.reset-size5.size11{font-size:2.76444444em}.katex .fontsize-ensurer.reset-size6.size1,.katex .sizing.reset-size6.size1{font-size:.5em}.katex .fontsize-ensurer.reset-size6.size2,.katex .sizing.reset-size6.size2{font-size:.6em}.katex .fontsize-ensurer.reset-size6.size3,.katex .sizing.reset-size6.size3{font-size:.7em}.katex .fontsize-ensurer.reset-size6.size4,.katex .sizing.reset-size6.size4{font-size:.8em}.katex .fontsize-ensurer.reset-size6.size5,.katex .sizing.reset-size6.size5{font-size:.9em}.katex .fontsize-ensurer.reset-size6.size6,.katex .sizing.reset-size6.size6{font-size:1em}.katex .fontsize-ensurer.reset-size6.size7,.katex .sizing.reset-size6.size7{font-size:1.2em}.katex .fontsize-ensurer.reset-size6.size8,.katex .sizing.reset-size6.size8{font-size:1.44em}.katex .fontsize-ensurer.reset-size6.size9,.katex .sizing.reset-size6.size9{font-size:1.728em}.katex .fontsize-ensurer.reset-size6.size10,.katex .sizing.reset-size6.size10{font-size:2.074em}.katex .fontsize-ensurer.reset-size6.size11,.katex .sizing.reset-size6.size11{font-size:2.488em}.katex .fontsize-ensurer.reset-size7.size1,.katex .sizing.reset-size7.size1{font-size:.41666667em}.katex .fontsize-ensurer.reset-size7.size2,.katex .sizing.reset-size7.size2{font-size:.5em}.katex .fontsize-ensurer.reset-size7.size3,.katex .sizing.reset-size7.size3{font-size:.58333333em}.katex .fontsize-ensurer.reset-size7.size4,.katex .sizing.reset-size7.size4{font-size:.66666667em}.katex .fontsize-ensurer.reset-size7.size5,.katex .sizing.reset-size7.size5{font-size:.75em}.katex .fontsize-ensurer.reset-size7.size6,.katex .sizing.reset-size7.size6{font-size:.83333333em}.katex .fontsize-ensurer.reset-size7.size7,.katex .sizing.reset-size7.size7{font-size:1em}.katex .fontsize-ensurer.reset-size7.size8,.katex .sizing.reset-size7.size8{font-size:1.2em}.katex .fontsize-ensurer.reset-size7.size9,.katex .sizing.reset-size7.size9{font-size:1.44em}.katex .fontsize-ensurer.reset-size7.size10,.katex .sizing.reset-size7.size10{font-size:1.72833333em}.katex .fontsize-ensurer.reset-size7.size11,.katex .sizing.reset-size7.size11{font-size:2.07333333em}.katex .fontsize-ensurer.reset-size8.size1,.katex .sizing.reset-size8.size1{font-size:.34722222em}.katex .fontsize-ensurer.reset-size8.size2,.katex .sizing.reset-size8.size2{font-size:.41666667em}.katex .fontsize-ensurer.reset-size8.size3,.katex .sizing.reset-size8.size3{font-size:.48611111em}.katex .fontsize-ensurer.reset-size8.size4,.katex .sizing.reset-size8.size4{font-size:.55555556em}.katex .fontsize-ensurer.reset-size8.size5,.katex .sizing.reset-size8.size5{font-size:.625em}.katex .fontsize-ensurer.reset-size8.size6,.katex .sizing.reset-size8.size6{font-size:.69444444em}.katex .fontsize-ensurer.reset-size8.size7,.katex .sizing.reset-size8.size7{font-size:.83333333em}.katex .fontsize-ensurer.reset-size8.size8,.katex .sizing.reset-size8.size8{font-size:1em}.katex .fontsize-ensurer.reset-size8.size9,.katex .sizing.reset-size8.size9{font-size:1.2em}.katex .fontsize-ensurer.reset-size8.size10,.katex .sizing.reset-size8.size10{font-size:1.44027778em}.katex .fontsize-ensurer.reset-size8.size11,.katex .sizing.reset-size8.size11{font-size:1.72777778em}.katex .fontsize-ensurer.reset-size9.size1,.katex .sizing.reset-size9.size1{font-size:.28935185em}.katex .fontsize-ensurer.reset-size9.size2,.katex .sizing.reset-size9.size2{font-size:.34722222em}.katex .fontsize-ensurer.reset-size9.size3,.katex .sizing.reset-size9.size3{font-size:.40509259em}.katex .fontsize-ensurer.reset-size9.size4,.katex .sizing.reset-size9.size4{font-size:.46296296em}.katex .fontsize-ensurer.reset-size9.size5,.katex .sizing.reset-size9.size5{font-size:.52083333em}.katex .fontsize-ensurer.reset-size9.size6,.katex .sizing.reset-size9.size6{font-size:.5787037em}.katex .fontsize-ensurer.reset-size9.size7,.katex .sizing.reset-size9.size7{font-size:.69444444em}.katex .fontsize-ensurer.reset-size9.size8,.katex .sizing.reset-size9.size8{font-size:.83333333em}.katex .fontsize-ensurer.reset-size9.size9,.katex .sizing.reset-size9.size9{font-size:1em}.katex .fontsize-ensurer.reset-size9.size10,.katex .sizing.reset-size9.size10{font-size:1.20023148em}.katex .fontsize-ensurer.reset-size9.size11,.katex .sizing.reset-size9.size11{font-size:1.43981481em}.katex .fontsize-ensurer.reset-size10.size1,.katex .sizing.reset-size10.size1{font-size:.24108004em}.katex .fontsize-ensurer.reset-size10.size2,.katex .sizing.reset-size10.size2{font-size:.28929605em}.katex .fontsize-ensurer.reset-size10.size3,.katex .sizing.reset-size10.size3{font-size:.33751205em}.katex .fontsize-ensurer.reset-size10.size4,.katex .sizing.reset-size10.size4{font-size:.38572806em}.katex .fontsize-ensurer.reset-size10.size5,.katex .sizing.reset-size10.size5{font-size:.43394407em}.katex .fontsize-ensurer.reset-size10.size6,.katex .sizing.reset-size10.size6{font-size:.48216008em}.katex .fontsize-ensurer.reset-size10.size7,.katex .sizing.reset-size10.size7{font-size:.57859209em}.katex .fontsize-ensurer.reset-size10.size8,.katex .sizing.reset-size10.size8{font-size:.69431051em}.katex .fontsize-ensurer.reset-size10.size9,.katex .sizing.reset-size10.size9{font-size:.83317261em}.katex .fontsize-ensurer.reset-size10.size10,.katex .sizing.reset-size10.size10{font-size:1em}.katex .fontsize-ensurer.reset-size10.size11,.katex .sizing.reset-size10.size11{font-size:1.19961427em}.katex .fontsize-ensurer.reset-size11.size1,.katex .sizing.reset-size11.size1{font-size:.20096463em}.katex .fontsize-ensurer.reset-size11.size2,.katex .sizing.reset-size11.size2{font-size:.24115756em}.katex .fontsize-ensurer.reset-size11.size3,.katex .sizing.reset-size11.size3{font-size:.28135048em}.katex .fontsize-ensurer.reset-size11.size4,.katex .sizing.reset-size11.size4{font-size:.32154341em}.katex .fontsize-ensurer.reset-size11.size5,.katex .sizing.reset-size11.size5{font-size:.36173633em}.katex .fontsize-ensurer.reset-size11.size6,.katex .sizing.reset-size11.size6{font-size:.40192926em}.katex .fontsize-ensurer.reset-size11.size7,.katex .sizing.reset-size11.size7{font-size:.48231511em}.katex .fontsize-ensurer.reset-size11.size8,.katex .sizing.reset-size11.size8{font-size:.57877814em}.katex .fontsize-ensurer.reset-size11.size9,.katex .sizing.reset-size11.size9{font-size:.69453376em}.katex .fontsize-ensurer.reset-size11.size10,.katex .sizing.reset-size11.size10{font-size:.83360129em}.katex .fontsize-ensurer.reset-size11.size11,.katex .sizing.reset-size11.size11{font-size:1em}.katex .delimsizing.size1{font-family:KaTeX_Size1}.katex .delimsizing.size2{font-family:KaTeX_Size2}.katex .delimsizing.size3{font-family:KaTeX_Size3}.katex .delimsizing.size4{font-family:KaTeX_Size4}.katex .delimsizing.mult .delim-size1>span{font-family:KaTeX_Size1}.katex .delimsizing.mult .delim-size4>span{font-family:KaTeX_Size4}.katex .nulldelimiter{display:inline-block;width:.12em}.katex .delimcenter,.katex .op-symbol{position:relative}.katex .op-symbol.small-op{font-family:KaTeX_Size1}.katex .op-symbol.large-op{font-family:KaTeX_Size2}.katex .accent>.vlist-t,.katex .op-limits>.vlist-t{text-align:center}.katex .accent .accent-body{position:relative}.katex .accent .accent-body:not(.accent-full){width:0}.katex .overlay{display:block}.katex .mtable .vertical-separator{display:inline-block;min-width:1px}.katex .mtable .arraycolsep{display:inline-block}.katex .mtable .col-align-c>.vlist-t{text-align:center}.katex .mtable .col-align-l>.vlist-t{text-align:left}.katex .mtable .col-align-r>.vlist-t{text-align:right}.katex .svg-align{text-align:left}.katex svg{fill:currentColor;stroke:currentColor;fill-rule:nonzero;fill-opacity:1;stroke-width:1;stroke-linecap:butt;stroke-linejoin:miter;stroke-miterlimit:4;stroke-dasharray:none;stroke-dashoffset:0;stroke-opacity:1;display:block;height:inherit;position:absolute;width:100%}.katex svg path{stroke:none}.katex img{border-style:none;max-height:none;max-width:none;min-height:0;min-width:0}.katex .stretchy{display:block;overflow:hidden;position:relative;width:100%}.katex .stretchy:after,.katex .stretchy:before{content:""}.katex .hide-tail{overflow:hidden;position:relative;width:100%}.katex .halfarrow-left{left:0;overflow:hidden;position:absolute;width:50.2%}.katex .halfarrow-right{overflow:hidden;position:absolute;right:0;width:50.2%}.katex .brace-left{left:0;overflow:hidden;position:absolute;width:25.1%}.katex .brace-center{left:25%;overflow:hidden;position:absolute;width:50%}.katex .brace-right{overflow:hidden;position:absolute;right:0;width:25.1%}.katex .x-arrow-pad{padding:0 .5em}.katex .cd-arrow-pad{padding:0 .55556em 0 .27778em}.katex .mover,.katex .munder,.katex .x-arrow{text-align:center}.katex .boxpad{padding:0 .3em}.katex .fbox,.katex .fcolorbox{border:.04em solid;box-sizing:border-box}.katex .cancel-pad{padding:0 .2em}.katex .cancel-lap{margin-left:-.2em;margin-right:-.2em}.katex .sout{border-bottom-style:solid;border-bottom-width:.08em}.katex .angl{border-right:.049em solid;border-top:.049em solid;box-sizing:border-box;margin-right:.03889em}.katex .anglpad{padding:0 .03889em}.katex .eqn-num:before{content:"(" counter(katexEqnNo) ")";counter-increment:katexEqnNo}.katex .mml-eqn-num:before{content:"(" counter(mmlEqnNo) ")";counter-increment:mmlEqnNo}.katex .mtr-glue{width:50%}.katex .cd-vert-arrow{display:inline-block;position:relative}.katex .cd-label-left{display:inline-block;position:absolute;right:calc(50% + .3em);text-align:left}.katex .cd-label-right{display:inline-block;left:calc(50% + .3em);position:absolute;text-align:right}.katex-display{display:block;margin:1em 0;text-align:center}.katex-display>.katex{display:block;text-align:center;white-space:nowrap}.katex-display>.katex>.katex-html{display:block;position:relative}.katex-display>.katex>.katex-html>.tag{position:absolute;right:0}.katex-display.leqno>.katex>.katex-html>.tag{left:0;right:auto}.katex-display.fleqn>.katex{padding-left:2em;text-align:left}body{counter-reset:katexEqnNo mmlEqnNo}';

// Katex 
document.head.insertAdjacentHTML('beforeend','<style>' + katexStyles + '</style>');
eval(await (await fetch('https://cdn.jsdelivr.net/npm/katex@0.16.4/dist/katex.min.js')).text());

// CSS 
document.head.insertAdjacentHTML('beforeend','<style>' + themeStyles + '</style>');
document.head.insertAdjacentHTML('beforeend','<style>' + darkModeStyles + '</style>');

main();