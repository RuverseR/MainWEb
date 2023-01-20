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

function inputFocus(start, insertedLength=0) {
    inputElement.focus();
    const caretPos = start + insertedLength;
    inputElement.setSelectionRange(caretPos, caretPos);
}

function addSymbol(symbol, subtract=0) {
    const start = inputElement.selectionStart;
    const end = inputElement.selectionEnd;
    const inputText = inputElement.value;
    inputElement.value = inputText.slice(0, start - subtract) + symbol + inputText.slice(end);
    inputLength = inputElement.value.length;
    inputFocus(start - subtract, symbol.length);
}

deltaSymbol.addEventListener('click', () => {
    addSymbol('Δ');
})

muSymbol.addEventListener('click', () => {
    addSymbol('μ');
})

lessequalSymbol.addEventListener('click', () => {
    addSymbol('≤');
})

greaterequalSymbol.addEventListener('click', () => {
    addSymbol('≥');
})

piSymbol.addEventListener('click', (e) => {
    addSymbol('π');
})

superscriptSymbol.addEventListener('click', () => {
    superscriptSymbol.classList.toggle('active');
    subscriptSymbol.classList.remove('active');
    const start = inputElement.selectionStart;
    inputFocus(start);
})

subscriptSymbol.addEventListener('click', () => {
    subscriptSymbol.classList.toggle('active');
    superscriptSymbol.classList.remove('active');
    const start = inputElement.selectionStart;
    inputFocus(start);
})

const superscript = ['⁰', '¹', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹', '⁺', '⁻', '⁼', '⁽', '⁾'];
const subscript = ['₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉', '₊', '₋', '₌', '₍', '₎'];
let inputLength = 0;
inputElement.addEventListener('input', (e) => {
    // Pressed backspace 
    if (inputElement.value.length < inputLength) {
        inputLength = inputElement.value.length;
        return
    }

    // Pressed a symbol 
    if (superscriptSymbol.classList.contains('active')) {
        const caretPos = inputElement.selectionStart - 1;
        if (isNumeric(inputElement.value[caretPos])) {
            symbol = superscript[inputElement.value[caretPos]];
            addSymbol(symbol, 1);
        } else if (inputElement.value[caretPos] == '+') {
            symbol = superscript[10];
            addSymbol(symbol, 1);
        } else if (inputElement.value[caretPos] == '-') {
            symbol = superscript[11];
            addSymbol(symbol, 1);
        } else if (inputElement.value[caretPos] == '=') {
            symbol = superscript[12];
            addSymbol(symbol, 1);
        } else if (inputElement.value[caretPos] == '(') {
            symbol = superscript[13];
            addSymbol(symbol, 1);
        } else if (inputElement.value[caretPos] == ')') {
            symbol = superscript[14];
            addSymbol(symbol, 1);
        }
    } else if (subscriptSymbol.classList.contains('active')) {
        const caretPos = inputElement.selectionStart - 1;
        console.log(inputElement.value[caretPos])
        if (isNumeric(inputElement.value[caretPos])) {
            symbol = subscript[inputElement.value[caretPos]];
            addSymbol(symbol, 1);
        } else if (inputElement.value[caretPos] == '+') {
            symbol = subscript[10];
            addSymbol(symbol, 1);
        } else if (inputElement.value[caretPos] == '-') {
            symbol = subscript[11];
            addSymbol(symbol, 1);
        } else if (inputElement.value[caretPos] == '=') {
            symbol = subscript[12];
            addSymbol(symbol, 1);
        } else if (inputElement.value[caretPos] == '(') {
            symbol = subscript[10];
            addSymbol(symbol, 1);
        } else if (inputElement.value[caretPos] == ')') {
            symbol = subscript[10];
            addSymbol(symbol, 1);
        }
    }
    inputLength = inputElement.value.length;
})