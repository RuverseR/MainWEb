console.clear();
credits();

function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

// PROGRAM
const reversibleSymbol = document.querySelector('.reversible-symbol');
const copyButton = document.querySelector('.copy-button');
const deltaSymbol = document.querySelector('.delta-symbol');
const superscriptSymbol = document.querySelector('.superscript-symbol');
const muSymbol = document.querySelector('.mu-symbol');
const lessequalSymbol = document.querySelector('.lessequal-symbol');
const greaterequalSymbol = document.querySelector('.greaterequal-symbol');
const piSymbol = document.querySelector('.pi-symbol');
const subscriptSymbol = document.querySelector('.subscript-symbol');
const inputElement = document.querySelector('#input');

reversibleSymbol.addEventListener('click', () => {
    inputElement.value += '⇌';
})

copyButton.addEventListener('click', () => {
    navigator.clipboard.writeText(inputElement.value).then(async function() {
        console.log('Copying to clipboard was successful!');
        copyButton.textContent = 'Copied!';
        await sleep(1000);
        copyButton.textContent = 'Copy';
    }, async function(err) {
        copyButton.textContent = 'Failed to copy';
        await sleep(1000);
        copyButton.textContent = 'Copy';
        console.error('Could not copy text: ', err);
    });
})

inputElement.addEventListener('keypress', (event)=> {
    if (event.keyCode === 13) {
        navigator.clipboard.writeText(inputElement.value).then(async function() {
            console.log('Copying to clipboard was successful!');
            copyButton.textContent = 'Copied!';
            await sleep(1000);
            copyButton.textContent = 'Copy';
        }, async function(err) {
            copyButton.textContent = 'Failed to copy';
            await sleep(1000);
            copyButton.textContent = 'Copy';
            console.error('Could not copy text: ', err);
        });
    }
})

deltaSymbol.addEventListener('click', () => {
    inputElement.value += 'Δ';
})

superscriptSymbol.addEventListener('click', () => {
    superscriptSymbol.classList.toggle('active');
    subscriptSymbol.classList.remove('active');
})

muSymbol.addEventListener('click', () => {
    inputElement.value += 'μ';
})

lessequalSymbol.addEventListener('click', () => {
    inputElement.value += '≤';
})

greaterequalSymbol.addEventListener('click', () => {
    inputElement.value += '≥';
})

piSymbol.addEventListener('click', () => {
    inputElement.value += 'π';
})

subscriptSymbol.addEventListener('click', () => {
    subscriptSymbol.classList.toggle('active');
    superscriptSymbol.classList.remove('active');

})

const superscript = ['⁰', '¹', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹', '⁺', '⁻', '⁼', '⁽', '⁾'];
const subscript = ['₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉', '₊', '₋', '₌', '₍', '₎'];
inputElement.addEventListener('input', () => {
    if (superscriptSymbol.classList.contains('active')) {
        if (isNumeric(inputElement.value[inputElement.value.length - 1])) {
            symbol = superscript[inputElement.value[inputElement.value.length - 1]];
            inputElement.value = inputElement.value.substring(0, inputElement.value.length - 1);
            inputElement.value += symbol;
        } else if (inputElement.value[inputElement.value.length - 1] == '+') {
            symbol = superscript[10];
            inputElement.value = inputElement.value.substring(0, inputElement.value.length - 1);
            inputElement.value += symbol;
        } else if (inputElement.value[inputElement.value.length - 1] == '-') {
            symbol = superscript[11];
            inputElement.value = inputElement.value.substring(0, inputElement.value.length - 1);
            inputElement.value += symbol;
        } else if (inputElement.value[inputElement.value.length - 1] == '=') {
            symbol = superscript[12];
            inputElement.value = inputElement.value.substring(0, inputElement.value.length - 1);
            inputElement.value += symbol;
        } else if (inputElement.value[inputElement.value.length - 1] == '(') {
            symbol = superscript[13];
            inputElement.value = inputElement.value.substring(0, inputElement.value.length - 1);
            inputElement.value += symbol;
        } else if (inputElement.value[inputElement.value.length - 1] == ')') {
            symbol = superscript[14];
            inputElement.value = inputElement.value.substring(0, inputElement.value.length - 1);
            inputElement.value += symbol;
        }
    } else if (subscriptSymbol.classList.contains('active')) {
        if (isNumeric(inputElement.value[inputElement.value.length - 1])) {
            symbol = subscript[inputElement.value[inputElement.value.length - 1]];
            inputElement.value = inputElement.value.substring(0, inputElement.value.length - 1);
            inputElement.value += symbol;
        } else if (inputElement.value[inputElement.value.length - 1] == '+') {
            symbol = subscript[10];
            inputElement.value = inputElement.value.substring(0, inputElement.value.length - 1);
            inputElement.value += symbol;
        } else if (inputElement.value[inputElement.value.length - 1] == '-') {
            symbol = subscript[11];
            inputElement.value = inputElement.value.substring(0, inputElement.value.length - 1);
            inputElement.value += symbol;
        } else if (inputElement.value[inputElement.value.length - 1] == '=') {
            symbol = subscript[12];
            inputElement.value = inputElement.value.substring(0, inputElement.value.length - 1);
            inputElement.value += symbol;
        } else if (inputElement.value[inputElement.value.length - 1] == '(') {
            symbol = subscript[10];
            inputElement.value = inputElement.value.substring(0, inputElement.value.length - 1);
            inputElement.value += symbol;
        } else if (inputElement.value[inputElement.value.length - 1] == ')') {
            symbol = subscript[10];
            inputElement.value = inputElement.value.substring(0, inputElement.value.length - 1);
            inputElement.value += symbol;
        }
    }
    console.log(inputElement.value[inputElement.value.length - 1]);
})