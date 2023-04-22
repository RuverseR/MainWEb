console.clear();
credits();

/*--------------------------------------------------------------
TABLE OF CONTENTS
----------------------------------------------------------------
1.0 GLOBAL FUNCTIONS
2.0 FIBONACCI SEQUENCE
    2.1 DOM ELEMENTS
    2.2 FUNCTIONS
    2.3 EVENT LISTENERS
3.0 TRIANGULAR NUMBERS
    3.1 DOM ELEMENTS
    3.2 FUNCTIONS
    3.3 EVENT LISTENERS
--------------------------------------------------------------*/

/*--------------------------------------------------------------
1.0 GLOBAL FUNCTIONS
--------------------------------------------------------------*/

function outputSequence(inputElement, outputElement, generatorFunction, errorMessage) {
    if (inputElement.value == '') {
        outputElement.innerHTML = errorMessage;
        return
    }
    sequence = generatorFunction(inputElement.value);
    outputElement.textContent = sequence;
}

/*--------------------------------------------------------------
2.0 FIBONACCI SEQUENCE
--------------------------------------------------------------*/

    /*------------------------------------------------------------
    |
    | 2.1 DOM ELEMENTS
    |
    ------------------------------------------------------------*/

const generateFibonacciButton = document.querySelector('#fibonacci-generate-button');
const fibonacciInputElement = document.querySelector('#fibonacci-input');
const fibonacciOutputElement = document.querySelector('#fibonacci-output');

    /*------------------------------------------------------------
    |
    | 2.2 FUNCTIONS
    |
    ------------------------------------------------------------*/

function fibonacci(length) {
    if (parseInt(length) <= 1) {
        console.log(1);
        return '1'
    } 
    if (parseInt(length) == 2) {
        console.log('1, 1');
        return '1, 1'
    }

    let fibonacciList = [1, 1];
    for (let i = 0; i < parseInt(length)-2; i++) {
        f = fibonacciList[fibonacciList.length - 1] + fibonacciList[fibonacciList.length - 2];
        fibonacciList.push(f);
    }
    console.log(fibonacciList.join(', '));

    return fibonacciList.join(', ')
}

    /*------------------------------------------------------------
    |
    | 2.3 EVENT LISTENERS
    |
    ------------------------------------------------------------*/

generateFibonacciButton.addEventListener('click', () => {
    outputSequence(fibonacciInputElement, fibonacciOutputElement, fibonacci, "Don't leave it <span class='orange-text'>empty</span>!");
})

fibonacciInputElement.addEventListener('keypress', (event)=> {
    if (event.keyCode === 13) {
        event.preventDefault();
        outputSequence(fibonacciInputElement, fibonacciOutputElement, fibonacci, "Don't leave it <span class='orange-text'>empty</span>!");
    }
})

/*--------------------------------------------------------------
3.0 TRIANGULAR NUMBERS
--------------------------------------------------------------*/

    /*------------------------------------------------------------
    |
    | 3.1 DOM ELEMENTS
    |
    ------------------------------------------------------------*/

const generateTriangularButton = document.querySelector('#triangular-generate-button');
const triangularInputElement = document.querySelector('#triangular-input');
const triangularOutputElement = document.querySelector('#triangular-output');

    /*------------------------------------------------------------
    |
    | 3.2 FUNCTIONS
    |
    ------------------------------------------------------------*/

function triangular(length) {
    // Formula: (n^2 + n) / 2

    let triangularNumbers = [];

    for (let n = 1; n < parseInt(length) + 1; n++) {
        t = (n**2 + n) / 2;
        triangularNumbers.push(t);
    }
    console.log(triangularNumbers.join(', '));

    return triangularNumbers.join(', ')
}

    /*------------------------------------------------------------
    |
    | 3.3 EVENT LISTENERS
    |
    ------------------------------------------------------------*/

generateTriangularButton.addEventListener('click', () => {
    outputSequence(triangularInputElement, triangularOutputElement, triangular, "Don't leave it <span class='orange-text'>empty</span>!");
})

triangularInputElement.addEventListener('keypress', (event)=> {
    if (event.keyCode === 13) {
        event.preventDefault();
        outputSequence(triangularInputElement, triangularOutputElement, triangular, "Don't leave it <span class='orange-text'>empty</span>!");
    }
})