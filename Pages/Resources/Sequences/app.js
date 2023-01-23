console.clear();
credits();

function round(number, decimalPlaces) {
    return Number(Math.round(number + "e" + decimalPlaces) + "e-" + decimalPlaces)
}


// FIBONACCI
const generateFibonacciButton = document.querySelector('#fibonacci-generate-button');
const fibonacciInputElement = document.querySelector('#fibonacci-input');
const fibonacciOutputElement = document.querySelector('#fibonacci-output');

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

generateFibonacciButton.addEventListener('click', () => {
    if (fibonacciInputElement.value == '') {
        fibonacciOutputElement.innerHTML = "Don't leave it <span class='orange-text'>empty</span>!";
        return
    }
    sequence = fibonacci(fibonacciInputElement.value);
    fibonacciOutputElement.textContent = sequence;
})

fibonacciInputElement.addEventListener('keypress', (event)=> {
    if (event.keyCode === 13) {
      event.preventDefault();
        if (fibonacciInputElement.value == '') {
            fibonacciOutputElement.innerHTML = "Don't leave it <span class='orange-text'>empty</span>!";
            return
        }
        sequence = fibonacci(fibonacciInputElement.value);
        fibonacciOutputElement.textContent = sequence;
    }
})

// TRIANGULAR NUMBERS
const generateTriangularButton = document.querySelector('#triangular-generate-button');
const triangularInputElement = document.querySelector('#triangular-input');
const triangularOutputElement = document.querySelector('#triangular-output');

function fibonacci(length) {
    // Formula: (n^2 + n) / 2

    let triangularNumbers = [];

    for (let n = 1; n < parseInt(length) + 1; n++) {
        t = (n**2 + n) / 2;
        triangularNumbers.push(t);
    }
    console.log(triangularNumbers.join(', '));

    return triangularNumbers.join(', ')
}

generateTriangularButton.addEventListener('click', () => {
    if (triangularInputElement.value == '') {
        triangularOutputElement.innerHTML = "Don't leave it <span class='orange-text'>empty</span>!";
        return
    }
    sequence = fibonacci(triangularInputElement.value);
    triangularOutputElement.textContent = sequence;
})

fibonacciInputElement.addEventListener('keypress', (event)=> {
    if (event.keyCode === 13) {
      event.preventDefault();
        if (triangularInputElement.value == '') {
            triangularOutputElement.innerHTML = "Don't leave it <span class='orange-text'>empty</span>!";
            return
        }
        sequence = fibonacci(triangularInputElement.value);
        triangularOutputElement.textContent = sequence;
    }
})