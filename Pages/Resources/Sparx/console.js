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

let answers = {};

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

            let answer = answers[bookworkCode];
            answer = answer.map(element => element.replace('\n', ''));
            answer = answer.map(element => element.replace(/\\\\/g, '\\'));
            console.log(answer);

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
                    let imageNodes = [];
                    for (let a = 0; a < answer.length; a++) {
                        let imageNode = displayMath(answer[a])
                        imageNodes.push(imageNode)
                    }

                    const textNode = document.createElement('b');
                    textNode.innerText = 'Stored answer: ';
                    textNode.style['margin'] = '0.3rem 1rem 0 0';
                    textNode.style['font-size'] = '2.5rem';
                    textNode.style['color'] = 'white';

                    const divNode = document.createElement('div');
                    divNode.style['display'] = 'flex';
                    divNode.style['align-items'] = 'center';
                    divNode.style['justify-content'] = 'center';

                    divNode.appendChild(textNode);
                    for (let a = 0; a < imageNodes.length; a++) {
                        imageNodes[a].setAttribute('id', 'shown-answer');
                        imageNodes[a].style['height'] = '3rem';
                        imageNodes[a].style['padding'] = '0.5rem';
                        divNode.appendChild(imageNodes[a]);
                    }
                    divNode.style['margin-bottom'] = '20px';
                    divNode.style['margin-top'] = '20px';
                    document.querySelector('.result-inner').append(divNode);
                }
            }
        } catch(err) {console.log(err)}
    }

    // Display correct bookwork code 
    let bookworkCodeElement = document.querySelector('.wac-text-container .bookwork-code');
    if (bookworkCodeElement !== null && document.querySelector('#custom-answer') === null) {
        try {
            let bookworkCode = bookworkCodeElement.textContent;
            bookworkCode = bookworkCode.replace("Bookwork code: ", '');
            console.log(bookworkCode);

            let answer = answers[bookworkCode];
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
                    let answers = answer.join('');
                    const textNode = document.createElement('b');
                    textNode.innerText = 'Answer: ';
                    textNode.style['margin'] = '0.3rem 1rem 0 0';
                    textNode.style['color'] = 'white';

                    const imageNode = displayMath(answers);
                    const divNode = document.createElement('div');
                    divNode.style['display'] = 'flex';
                    divNode.style['align-items'] = 'center';
                    divNode.style['justify-content'] = 'center';
                    imageNode.setAttribute('id', 'custom-answer');
                    imageNode.style['height'] = '3rem';

                    divNode.appendChild(textNode);
                    divNode.appendChild(imageNode);
                    divNode.style['margin-bottom'] = '20px';
                    document.querySelector('.wac-text-container').append(divNode);
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
                        answerOptions[i].classList.add('.bookwork-highlight');
                    }
                    let answerArray = answer.join('');
                    answerArray = answerArray.split('');
                    uniques = answerArray.unique();
                    answerOptions[i].querySelector('.answer-markup.choice-wac-option').classList.add('.bookwork-highlight-orange');
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

function displayMath(answer) {
    const imageNode = document.createElement('img');
    const source = `https://math.vercel.app/?color=white&from=${answer}`
    imageNode.setAttribute('src', source);
   
    return imageNode;
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
    
                answerData = getInput(bookworkCode);
                answers[bookworkCode] = answerData[bookworkCode];
                console.log('Value currently is ' + JSON.stringify(answers));
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

            answerData = getInput(bookworkCode);
            answers[bookworkCode] = answerData[bookworkCode];
            console.log('Value currently is ' + JSON.stringify(answers));
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

function getInput(bookworkCode) {
    answerData = {};
    answerData[bookworkCode] = [];

    // Get input value
    const keypadInputs = document.querySelectorAll('.number-input');
    if (keypadInputs !== null) {
        for (let i = 0; i < keypadInputs.length; i++) {
            inputValue = keypadInputs[i].attributes[10].value;
            answerData[bookworkCode].push(inputValue);
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
                answerData[bookworkCode].push(innerChoice);
            } else if (choice.includes('image')) {
                const imageElement = chosen[i].querySelector('[data-test-target="image-img"]');
                const source = imageElement.currentSrc;
                answerData[bookworkCode].push(source.toString());
            } else {
                answerData[bookworkCode].push(choice);
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
                answerData[bookworkCode].push(innerCard);
            } else {
                answerData[bookworkCode].push(card);
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
        answerData[bookworkCode].push(fraction);
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
                answerData[bookworkCode].push(innerCard);
            } else {
                answerData[bookworkCode].push(card);
            }
        }
    }

    console.log(answerData);

    return answerData
}

function waitForElm(selector) {
    return new Promise(resolve => {
        if (document.querySelector(selector)) {
            return resolve(document.querySelector(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelector(selector)) {
                resolve(document.querySelector(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

function waitForElms(selector) {
    return new Promise(resolve => {
        if (document.querySelectorAll(selector)) {
            return resolve(document.querySelectorAll(selector));
        }

        const observer = new MutationObserver(mutations => {
            if (document.querySelectorAll(selector)) {
                resolve(document.querySelectorAll(selector));
                observer.disconnect();
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    });
}

const themeStyles = '[class~=themes-container] ul li{list-style-type:none;}[class~=themes-container] ul{border-left-width:.125pc;}[class~=themes-container] ul{border-bottom-width:.125pc;}[class~=themes-container] ul li div{background-color:orange;}[class~=themes-container] ul{border-right-width:.125pc;}[class~=themes-container] ul{border-top-width:.125pc;}.themes-container,[class~=themes-container] ul,[class~=themes-container] ul li{display:flex;}[class~=themes-container] ul{border-left-style:solid;}[class~=themes-container] ul{border-bottom-style:solid;}[class~=themes-container] ul{border-right-style:solid;}.themes-container{align-items:center;}[class~=themes-container] ul{border-top-style:solid;}.themes-container{justify-content:center;}.themes-container,[class~=themes-container] ul{flex-direction:column;}[class~=themes-container] ul{border-left-color:white;}[class~=themes-container] ul{border-bottom-color:white;}.themes-container ul li:hover{cursor:pointer;}.themes-container{width:40vw;}[class~=themes-container] ul li div{height:37.5pt;}[class~=themes-container] ul li div{width:25%;}.themes-container ul li:hover{filter:brightness(80%);}[class~=themes-container] ul{border-right-color:white;}[class~=themes-container] ul{border-top-color:white;}[class~=themes-container] ul{border-image:none;}[class~=themes-container] ul{padding-left:0;}[class~=themes-container] ul{padding-bottom:0;}[class~=themes-container] ul{padding-right:0;}[class~=themes-container] ul li{flex-direction:row;}[class~=themes-container] ul{padding-top:0;}[class~=themes-container] ul{width:100%;}@media (max-width: 1000px){[class~=themes-container]{width:60vw;}}'
const darkModeStyles = '[class~=themes-container] ul li:hover{cursor:pointer;}[class~=themes-container] ul li div{background-color:orange;}[class~=themes-container] ul li,body,[class~=themes-container],[class~=themes-container] ul{display:flex;}body,[class~=themes-container]{align-items:center;}[class~=themes-container] ul{border-left-width:.020833333in;}[class~=themes-container] ul{border-bottom-width:.020833333in;}[class~=themes-container] ul{border-right-width:.020833333in;}[class~=themes-container],body{justify-content:center;}[class~=themes-container] ul{border-top-width:.020833333in;}[class~=themes-container] ul{border-left-style:solid;}[class~=themes-container] ul{border-bottom-style:solid;}[class~=themes-container] ul{border-right-style:solid;}[class~=themes-container] ul li div{height:3.125pc;}[class~=themes-container] ul{border-top-style:solid;}[class~=themes-container] ul{border-left-color:white;}[class~=themes-container] ul{border-bottom-color:white;}[class~=themes-container] ul{border-right-color:white;}[class~=themes-container] ul li div{width:25%;}[class~=themes-container] ul{border-top-color:white;}[class~=themes-container] ul{border-image:none;}[class~=themes-container] ul{padding-left:0;}body{box-sizing:border-box;}[class~=themes-container] ul{padding-bottom:0;}[class~=themes-container] ul li{list-style-type:none;}[class~=themes-container] ul li:hover{filter:brightness(80%);}[class~=themes-container] ul,[class~=themes-container]{flex-direction:column;}[class~=themes-container] ul{padding-right:0;}[class~=themes-container]{width:40vw;}[class~=themes-container] ul{padding-top:0;}[class~=themes-container] ul{width:100%;}[class~=themes-container] ul li{flex-direction:row;}@media (max-width: 1000px){[class~=themes-container]{width:60vw;}}:root{--orange:#f46815;}[class~=package-list] > div > span > ul > div{background:var(--dark) !important;}[class~=entry-area-bubble] [class~=text]{color:var(--darkest) !important;}:root{--grey:#f8f8f7;}:root{--dark-grey:#e9e9e9;}:root{--darkest:#241e92;}:root{--dark:#5432d3;}:root{--light:#7b6cf6;}:root{--lightest:#e5a5ff;}.revision-task,.revision-strand-button,[class~=revision-homework-button],[class~=activity-feed-day],[class~=wac-text-container] [class~=bookwork-code],.skill-delivery-view .view-body{background:var(--light) !important;}[class~=main-view],[class~=package-container],[class~=um-login-container],[class~=view-body]{background:var(--darkest) !important;}.package-list > div > span > ul > div > .task-title{color:var(--dark-grey) !important;}[class~=answer-markup][class~=choice-wac-option][class~=choice][class~=choice-answer-markup]{background:var(--grey) !important;}.revision-homework-button-container,[class~=revision-topic-page],[class~=package-filter-list]{background:var(--dark) !important;}[class~=question-text],[class~=package-heading],[class~=status-bar],[class~=um-header],.status-bar-label-text,[class~=revision-tab],.btn-menu-item,[class~=question-only],[class~=footer-cookie-banner-container],[class~=footer-container],[class~=answer-only],.revision-strand-page{background:var(--light) !important;}[class~=package-list] > div > span > ul > div{border-left-color:var(--dark) !important;}[class~=wac-text-container] [class~=bookwork-code],[class~=revision-tabs]{border-bottom-width:medium !important;}[class~=revision-tabs]{border-bottom-style:none !important;}[class~=revision-tabs]{border-bottom-color:var(--light) !important;}[class~=revision-tabs]{border-image:none !important;}[class~=btn-menu-item]{border-left-width:.010416667in !important;}[class~=btn-menu-item]{border-bottom-width:.010416667in !important;}[class~=btn-menu-item]{border-right-width:.010416667in !important;}[class~=btn-menu-item]{border-top-width:.010416667in !important;}[class~=btn-menu-item]{border-left-style:solid !important;}[class~=wac-text-container] [class~=bookwork-code]{border-left-width:medium !important;}[class~=btn-menu-item]{border-bottom-style:solid !important;}[class~=btn-menu-item]{border-right-style:solid !important;}[class~=btn-menu-item]{border-top-style:solid !important;}[class~=btn-menu-item]{border-left-color:var(--light) !important;}[class~=btn-menu-item]{border-bottom-color:var(--light) !important;}[class~=btn-menu-item]{border-right-color:var(--light) !important;}[class~=btn-menu-item]{border-top-color:var(--light) !important;}[class~=btn-menu-item]{border-image:none !important;}[class~=package-heading]{border-left-width:.010416667in !important;}[class~=package-heading]{border-bottom-width:.010416667in !important;}[class~=wac-text-container] [class~=bookwork-code]{border-right-width:medium !important;}[class~=package-heading]{border-right-width:.010416667in !important;}[class~=package-heading]{border-top-width:.010416667in !important;}[class~=package-heading]{border-left-style:solid !important;}[class~=wac-text-container] [class~=bookwork-code]{border-top-width:medium !important;}[class~=package-heading]{border-bottom-style:solid !important;}[class~=package-heading]{border-right-style:solid !important;}[class~=package-heading]{border-top-style:solid !important;}[class~=package-heading]{border-left-color:var(--light) !important;}[class~=package-heading]{border-bottom-color:var(--light) !important;}[class~=package-heading]{border-right-color:var(--light) !important;}[class~=package-heading]{border-top-color:var(--light) !important;}[class~=package-heading]{border-image:none !important;}[class~=revision-homework-button]{border-left-width:.010416667in !important;}[class~=revision-homework-button]{border-bottom-width:.010416667in !important;}[class~=revision-homework-button]{border-right-width:.010416667in !important;}[class~=revision-homework-button]{border-top-width:.010416667in !important;}[class~=revision-homework-button]{border-left-style:solid !important;}[class~=revision-homework-button]{border-bottom-style:solid !important;}[class~=revision-homework-button]{border-right-style:solid !important;}[class~=revision-homework-button]{border-top-style:solid !important;}[class~=wac-text-container] [class~=bookwork-code]{border-left-style:none !important;}[class~=revision-homework-button]{border-left-color:var(--light) !important;}[class~=revision-homework-button]{border-bottom-color:var(--light) !important;}[class~=revision-homework-button]{border-right-color:var(--light) !important;}[class~=revision-homework-button]{border-top-color:var(--light) !important;}[class~=revision-homework-button]{border-image:none !important;}[class~=status-bar-menu-button],[class~=um-login-box__content],.accordion-element-header,.activity-feed-work,[class~=status-bar-menu-item],.choice-wac-options,[class~=revision-task-item]{background:var(--lightest) !important;}[class~=status-bar-menu-button]{border-left-width:medium !important;}[class~=status-bar-menu-button]{border-bottom-width:medium !important;}[class~=package-list] > div > span > ul > div{border-bottom-color:var(--dark) !important;}[class~=status-bar-menu-button]{border-right-width:medium !important;}[class~=status-bar-menu-button]{border-top-width:medium !important;}[class~=status-bar-menu-button]{border-left-style:solid !important;}[class~=status-bar-menu-button]{border-bottom-style:solid !important;}[class~=status-bar-menu-button]{border-right-style:solid !important;}[class~=status-bar-menu-button]{border-top-style:solid !important;}[class~=status-bar-menu-button]{border-left-color:var(--lightest) !important;}[class~=status-bar-menu-button]{border-bottom-color:var(--lightest) !important;}[class~=status-bar-menu-button]{border-right-color:var(--lightest) !important;}[class~=status-bar-menu-button]{border-top-color:var(--lightest) !important;}[class~=status-bar-menu-button]{border-image:none !important;}[class~=wac-text-container] [class~=bookwork-code]{border-bottom-style:none !important;}[class~=wac-text-container] [class~=bookwork-code]{border-right-style:none !important;}[class~=status-bar-menu-item]{border-left-color:var(--lightest) !important;}[class~=status-bar-menu-item]{border-bottom-color:var(--lightest) !important;}[class~=status-bar-menu-item]{border-right-color:var(--lightest) !important;}[class~=status-bar-menu-item]{border-top-color:var(--lightest) !important;}[class~=revision-topic-page],[class~=revision-substrand-extra],[class~=result-inner] h1[class~=incorrect],[class~=school-selector],[class~=wac-text],[class~=wac-header-container],[class~=activity-feed-work-counts],.accordion-element-header,[class~=revision-homework-button],[class~=activity-feed-work],[class~=question-text] > div > [class~=text],[class~=revision-location-stream],[class~=package-heading],.revision-strand-button,[class~=btn-menu-item],[class~=text-container]{color:var(--grey) !important;}[class~=wac-text-container] [class~=bookwork-code]{border-top-style:none !important;}[class~=wac-text-container] [class~=bookwork-code]{border-left-color:currentColor !important;}[class~=choice-text]{background:var(--grey) !important;}[class~=active],[class~=revision-location-stream],[class~=revision-strand-button]{border-left-color:var(--grey) !important;}[class~=revision-location-stream],[class~=revision-strand-button],[class~=active]{border-bottom-color:var(--grey) !important;}[class~=revision-strand-button],[class~=revision-location-stream],[class~=active]{border-right-color:var(--grey) !important;}[class~=revision-location-stream],[class~=revision-strand-button],[class~=active]{border-top-color:var(--grey) !important;}[class~=active]{border-left-width:.0625pc !important;}[class~=active]{border-bottom-width:.0625pc !important;}[class~=active]{border-right-width:.0625pc !important;}[class~=active]{border-top-width:.0625pc !important;}[class~=active]{border-left-style:solid !important;}[class~=active]{border-bottom-style:solid !important;}[class~=active]{border-right-style:solid !important;}[class~=active]{border-top-style:solid !important;}[class~=active]{border-image:none !important;}.package-filter-arrow{border-left-color:var(--grey) !important;}[class~=wac-text-container] [class~=bookwork-code]{border-bottom-color:currentColor !important;}[class~=bookwork-highlight]{border-left-width:.3125pc;}[class~=bookwork-highlight]{border-bottom-width:.3125pc;}[class~=bookwork-highlight]{border-right-width:.3125pc;}[class~=bookwork-highlight]{border-top-width:.3125pc;}[class~=bookwork-highlight]{border-left-style:solid;}[class~=bookwork-highlight]{border-bottom-style:solid;}[class~=bookwork-highlight]{border-right-style:solid;}[class~=bookwork-highlight]{border-top-style:solid;}[class~=bookwork-highlight]{border-left-color:var(--light);}[class~=bookwork-highlight]{border-bottom-color:var(--light);}[class~=wac-text-container] [class~=bookwork-code]{border-right-color:currentColor !important;}[class~=bookwork-highlight]{border-right-color:var(--light);}[class~=package-list] > div > span > ul > div{border-right-color:var(--dark) !important;}[class~=wac-text-container] [class~=bookwork-code]{border-top-color:currentColor !important;}[class~=bookwork-highlight]{border-top-color:var(--light);}[class~=bookwork-highlight]{border-image:none;}[class~=bookwork-highlight-orange]{border-left-width:.052083333in;}[class~=wac-text-container] [class~=bookwork-code]{border-image:none !important;}[class~=bookwork-highlight-orange]{border-bottom-width:.052083333in;}[class~=bookwork-highlight-orange]{border-right-width:.052083333in;}[class~=bookwork-highlight-orange]{border-top-width:.052083333in;}[class~=bookwork-highlight-orange]{border-left-style:solid;}[class~=result-inner] h2,[class~=result-inner] [class~=result-subtitle-prominent],.activity-feed-day > h2,[class~=answer-part] > div > [class~=text]{color:var(--grey) !important;}[class~=package-list] > div > span > ul > div{border-top-color:var(--dark) !important;}[class~=bookwork-highlight-orange]{border-bottom-style:solid;}[class~=bookwork-highlight-orange]{border-right-style:solid;}[class~=bookwork-highlight-orange]{border-top-style:solid;}[class~=bookwork-highlight-orange]{border-left-color:var(--orange);}[class~=bookwork-highlight-orange]{border-bottom-color:var(--orange);}[class~=bookwork-highlight-orange]{border-right-color:var(--orange);}[class~=bookwork-highlight-orange]{border-top-color:var(--orange);}[class~=bookwork-highlight-orange]{border-image:none;}.dummytaskitem{border-left-width:medium !important;}#answer-wac-box,[class~=revision-tab][class~=revision-tab-active]{background:var(--lightest) !important;}.dummytaskitem{border-bottom-width:medium !important;}.dummytaskitem{border-right-width:medium !important;}.dummytaskitem{border-top-width:medium !important;}.dummytaskitem{border-left-style:none !important;}.dummytaskitem{border-bottom-style:none !important;}.dummytaskitem{border-right-style:none !important;}.dummytaskitem{border-top-style:none !important;}.dummytaskitem{border-left-color:currentColor !important;}.dummytaskitem{border-bottom-color:currentColor !important;}[class~=selected] [class~=text]{color:var(--orange) !important;}.dummytaskitem{border-right-color:currentColor !important;}.dummytaskitem{border-top-color:currentColor !important;}.dummytaskitem{border-image:none !important;}'

document.head.insertAdjacentHTML('beforeend','<style>' + themeStyles + '</style>');
document.head.insertAdjacentHTML('beforeend','<style>' + darkModeStyles + '</style>');

main();