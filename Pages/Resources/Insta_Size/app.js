console.clear();
credits();

// PROGRAM
const generateButton = document.querySelector('.generate-button');
const inputElement = document.querySelector('#input');
const outputElement = document.querySelector('#output');

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

generateButton.addEventListener('click', () => {
    if (inputElement.value == '') {
        outputElement.innerHTML = "Don't leave it <span class='orange-text'>empty</span>!";
        return
    }
    sequence = fibonacci(inputElement.value);
    outputElement.textContent = sequence;
})

inputElement.addEventListener('keypress', (event)=> {
    if (event.keyCode === 13) {
      event.preventDefault();
        if (inputElement.value == '') {
            outputElement.innerHTML = "Don't leave it <span class='orange-text'>empty</span>!";
            return
        }
        sequence = fibonacci(inputElement.value);
        outputElement.textContent = sequence;
    }
})