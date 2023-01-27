console.clear();
credits();

function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

// CHEMICAL FORMULAS
const reversibleSymbol = document.querySelector('.reversible-symbol');
const copyButton = document.querySelector('.copy-button');
const deltaSymbol = document.querySelector('.delta-symbol');
const superscriptSymbol = document.querySelector('.superscript-symbol');
const muSymbol = document.querySelector('.mu-symbol');
const lessequalSymbol = document.querySelector('.lessequal-symbol');
const greaterequalSymbol = document.querySelector('.greaterequal-symbol');
const piSymbol = document.querySelector('.pi-symbol');
const subscriptSymbol = document.querySelector('.subscript-symbol');
const chemicalFormulaInput = document.querySelector('#input');

reversibleSymbol.addEventListener('click', () => {
    chemicalFormulaInput.value += '⇌';
})

copyButton.addEventListener('click', () => {
    navigator.clipboard.writeText(chemicalFormulaInput.value).then(async function() {
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

chemicalFormulaInput.addEventListener('keypress', (event)=> {
    if (event.keyCode === 13) {
        navigator.clipboard.writeText(chemicalFormulaInput.value).then(async function() {
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
    chemicalFormulaInput.focus();
    const caretPos = start + insertedLength;
    chemicalFormulaInput.setSelectionRange(caretPos, caretPos);
}

function addSymbol(symbol, subtract=0) {
    const start = chemicalFormulaInput.selectionStart;
    const end = chemicalFormulaInput.selectionEnd;
    const inputText = chemicalFormulaInput.value;
    chemicalFormulaInput.value = inputText.slice(0, start - subtract) + symbol + inputText.slice(end);
    inputLength = chemicalFormulaInput.value.length;
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
    const start = chemicalFormulaInput.selectionStart;
    inputFocus(start);
})

subscriptSymbol.addEventListener('click', () => {
    subscriptSymbol.classList.toggle('active');
    superscriptSymbol.classList.remove('active');
    const start = chemicalFormulaInput.selectionStart;
    inputFocus(start);
})

const superscript = ['⁰', '¹', '²', '³', '⁴', '⁵', '⁶', '⁷', '⁸', '⁹', '⁺', '⁻', '⁼', '⁽', '⁾'];
const subscript = ['₀', '₁', '₂', '₃', '₄', '₅', '₆', '₇', '₈', '₉', '₊', '₋', '₌', '₍', '₎'];
let inputLength = 0;
chemicalFormulaInput.addEventListener('input', (e) => {
    // Pressed backspace 
    if (chemicalFormulaInput.value.length < inputLength) {
        inputLength = chemicalFormulaInput.value.length;
        return
    }

    // Pressed a symbol 
    if (superscriptSymbol.classList.contains('active')) {
        const caretPos = chemicalFormulaInput.selectionStart - 1;
        if (isNumeric(chemicalFormulaInput.value[caretPos])) {
            symbol = superscript[chemicalFormulaInput.value[caretPos]];
            addSymbol(symbol, 1);
        } else if (chemicalFormulaInput.value[caretPos] == '+') {
            symbol = superscript[10];
            addSymbol(symbol, 1);
        } else if (chemicalFormulaInput.value[caretPos] == '-') {
            symbol = superscript[11];
            addSymbol(symbol, 1);
        } else if (chemicalFormulaInput.value[caretPos] == '=') {
            symbol = superscript[12];
            addSymbol(symbol, 1);
        } else if (chemicalFormulaInput.value[caretPos] == '(') {
            symbol = superscript[13];
            addSymbol(symbol, 1);
        } else if (chemicalFormulaInput.value[caretPos] == ')') {
            symbol = superscript[14];
            addSymbol(symbol, 1);
        }
    } else if (subscriptSymbol.classList.contains('active')) {
        const caretPos = chemicalFormulaInput.selectionStart - 1;
        console.log(chemicalFormulaInput.value[caretPos])
        if (isNumeric(chemicalFormulaInput.value[caretPos])) {
            symbol = subscript[chemicalFormulaInput.value[caretPos]];
            addSymbol(symbol, 1);
        } else if (chemicalFormulaInput.value[caretPos] == '+') {
            symbol = subscript[10];
            addSymbol(symbol, 1);
        } else if (chemicalFormulaInput.value[caretPos] == '-') {
            symbol = subscript[11];
            addSymbol(symbol, 1);
        } else if (chemicalFormulaInput.value[caretPos] == '=') {
            symbol = subscript[12];
            addSymbol(symbol, 1);
        } else if (chemicalFormulaInput.value[caretPos] == '(') {
            symbol = subscript[10];
            addSymbol(symbol, 1);
        } else if (chemicalFormulaInput.value[caretPos] == ')') {
            symbol = subscript[10];
            addSymbol(symbol, 1);
        }
    }
    inputLength = chemicalFormulaInput.value.length;
})


// ELECTROLYSIS OF AQUEOUS SOLUTIONS 
const metalInput = document.querySelector('#metal');
const nonMetalInput = document.querySelector('#non-metal');
const electrolysisOutput = document.querySelector('#electrolysis-output');
const electrolysisButton = document.querySelector('#electrolysis-button');

REACTIVITY_SERIES = {
    'Potassium': 24,
    'K': 24,
    'Sodium': 23,
    'Na': 23,
    'Lithium': 22,
    'Li': 22,
    'Barium': 21,
    'Ba': 21,
    'Strontium': 20,
    'Sr': 20,
    'Calcium': 19,
    'Ca': 19,
    'Magnesium': 18,
    'Mg': 18,
    'Aluminium': 17,
    'Al': 17,
    'Manganese': 16,
    'Mn': 16,
    'Zinc': 15,
    'Zn': 15,
    'Chromium': 14,
    'Cr': 14,
    'Iron': 13,
    'Fe': 13,
    'Cadmium': 12,
    'Cd': 12,
    'Cobalt': 11,
    'Co': 11,
    'Nickel': 10,
    'Ni': 10,
    'Tin': 9,
    'Sn': 9,
    'Lead': 8,
    'Pb': 8,
    'Hydrogen': 7,
    'H': 7,
    'Antimony': 6,
    'Sb': 6,
    'Bismuth': 5,
    'Bi': 5,
    'Copper': 4,
    'Cu': 4,
    'Mercury': 3,
    'Hg': 3,
    'Silver': 2,
    'Ag': 2,
    'Gold': 1,
    'Au': 1,
    'Platinum': 0,
    'Pt': 0
}

HALOGENS = [
    'Fluorine',
    'Chlorine',
    'Bromine',
    'Iodine',
    'Astatine'
]

function formatString(string) {
    // Capitalises the first letter of the string 
    return string.toLowerCase().charAt(0).toUpperCase() + string.slice(1);
}

function electrolysis() {
    // Check that all inputs are filled 
    if (!((metalInput && metalInput.value) && (nonMetalInput && nonMetalInput.value))) { return }

    let metal = formatString(metalInput.value);
    let nonMetal = formatString(nonMetalInput.value);

    if (REACTIVITY_SERIES[metal] !== undefined) {
        if (REACTIVITY_SERIES[metal] > REACTIVITY_SERIES['Hydrogen']) {
            metal = 'Hydrogen';
        } 
    } else {
        electrolysisOutput.innerHTML = `<span class="orange-text">${metal}</span> is <span class="orange-text">not</span> an element in the <span class="orange-text">reactivity</span> series.`;
        return
    }

    if (!(HALOGENS.includes(nonMetal))) {
        nonMetal = 'Oxygen';
    }

    electrolysisOutput.innerHTML = `<span class="orange-text">${metal}</span> is produced at the <span class="orange-text">cathode</span><br><br><span class="orange-text">${nonMetal}</span> is produced at the <span class="orange-text">anode</span>`;
}

electrolysisButton.addEventListener('click', () => {
    electrolysis();
})

metalInput.addEventListener('keypress', (event)=> {
    // Check if enter key is pressed
    if (!(event.keyCode === 13)) { return }

    electrolysis();
})

nonMetalInput.addEventListener('keypress', (event)=> {
    // Check if enter key is pressed
    if (!(event.keyCode === 13)) { return }

    electrolysis();
})