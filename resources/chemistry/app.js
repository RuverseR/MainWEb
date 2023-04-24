console.clear();
credits();

/*--------------------------------------------------------------
TABLE OF CONTENTS
----------------------------------------------------------------
1.0 CHEMICAL FORMULA EDITOR
    1.1 DOM ELEMENTS
    1.2 FUNCTIONS
    1.3 EVENT LISTENERS
2.0 ELECTROLYSIS OF AQUEOUS SOLUTIONS 
    2.1 DOM ELEMENTS
    2.2 FUNCTIONS
    2.3 EVENT LISTENERS
--------------------------------------------------------------*/

/*--------------------------------------------------------------
1.0 CHEMICAL FORMULA EDITOR
--------------------------------------------------------------*/

    /*------------------------------------------------------------
    |
    | 1.1 DOM ELEMENTS
    |
    ------------------------------------------------------------*/

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

    /*------------------------------------------------------------
    |
    | 1.2 FUNCTIONS
    |
    ------------------------------------------------------------*/

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

function typeSuperSubscript(scriptSymbols) {
    const caretPos = chemicalFormulaInput.selectionStart - 1;
    console.log(chemicalFormulaInput.value[caretPos])
    if (isNumeric(chemicalFormulaInput.value[caretPos])) {
        symbol = scriptSymbols[chemicalFormulaInput.value[caretPos]];
        addSymbol(symbol, 1);
    } else if (chemicalFormulaInput.value[caretPos] == '+') {
        symbol = scriptSymbols[10];
        addSymbol(symbol, 1);
    } else if (chemicalFormulaInput.value[caretPos] == '-') {
        symbol = scriptSymbols[11];
        addSymbol(symbol, 1);
    } else if (chemicalFormulaInput.value[caretPos] == '=') {
        symbol = scriptSymbols[12];
        addSymbol(symbol, 1);
    } else if (chemicalFormulaInput.value[caretPos] == '(') {
        symbol = scriptSymbols[13];
        addSymbol(symbol, 1);
    } else if (chemicalFormulaInput.value[caretPos] == ')') {
        symbol = scriptSymbols[14];
        addSymbol(symbol, 1);
    }
}

    /*------------------------------------------------------------
    |
    | 1.3 EVENT LISTENERS
    |
    ------------------------------------------------------------*/

reversibleSymbol.addEventListener('click', () => {
    chemicalFormulaInput.value += '⇌';
})

copyButton.addEventListener('click', () => {
    copy(chemicalFormulaInput.value, copyButton, message='Copied!', initialText='Copy', errorMessage='Failed to copy', delay=1000)
})

chemicalFormulaInput.addEventListener('keypress', (event) => {
    if (event.keyCode === 13) {
        copy(chemicalFormulaInput.value, copyButton, message='Copied!', initialText='Copy', errorMessage='Failed to copy', delay=1000)
    }
})

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

piSymbol.addEventListener('click', () => {
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
chemicalFormulaInput.addEventListener('input', () => {
    // Pressed backspace 
    if (chemicalFormulaInput.value.length < inputLength) {
        inputLength = chemicalFormulaInput.value.length;
        return
    }

    // Pressed a symbol 
    if (superscriptSymbol.classList.contains('active')) { typeSuperSubscript(superscript); } 
    else if (subscriptSymbol.classList.contains('active')) { typeSuperSubscript(subscript); }

    inputLength = chemicalFormulaInput.value.length;
})

/*--------------------------------------------------------------
2.0 ELECTROLYSIS OF AQUEOUS SOLUTIONS
--------------------------------------------------------------*/

    /*------------------------------------------------------------
    |
    | 2.1 DOM ELEMENTS
    |
    ------------------------------------------------------------*/

const metalInput = document.querySelector('#metal');
const nonMetalInput = document.querySelector('#non-metal');
const electrolysisOutput = document.querySelector('#electrolysis-output');
const electrolysisButton = document.querySelector('#electrolysis-button');

    /*------------------------------------------------------------
    |
    | 2.2 FUNCTIONS
    |
    ------------------------------------------------------------*/

function formatString(string) {
    // Capitalises the first letter of the string 
    return string.toLowerCase().charAt(0).toUpperCase() + string.slice(1);
}

function electrolysis() {
    // Check that all inputs are filled 
    if (!((metalInput && metalInput.value) && (nonMetalInput && nonMetalInput.value))) { return }

    let metal = formatString(metalInput.value);
    let nonMetal = formatString(nonMetalInput.value);

    if (REACTIVITY_SERIES_SYMBOLS[metal] !== undefined) { metal = REACTIVITY_SERIES_SYMBOLS[metal] }

    if (REACTIVITY_SERIES_ELEMENTS[metal] !== undefined) {
        if (REACTIVITY_SERIES_ELEMENTS[metal] > REACTIVITY_SERIES_ELEMENTS['Hydrogen']) {
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

    /*------------------------------------------------------------
    |
    | 2.3 EVENT LISTENERS
    |
    ------------------------------------------------------------*/

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