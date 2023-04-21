console.clear();
credits();

const copyNumber = document.querySelector('#phone-number');
const body = document.querySelector('body');
const number = "+44 7472 404572";

console.log(copyNumber);

copyNumber.addEventListener('click', () => {copy(number, copyNumber, message='Copied!', initialText='Copy', errorMessage='Failed to copy', delay=1000)})

body.addEventListener('keypress', (event) => {
    if (event.keyCode === 13) {copy(number, copyNumber, message='Copied!', initialText='Copy', errorMessage='Failed to copy', delay=1000)}
})