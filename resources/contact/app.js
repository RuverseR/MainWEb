console.clear();
credits();

function isNumeric(str) {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

// CHEMICAL FORMULAS
const copyNumber = document.querySelector('#phone-number');
const body = document.querySelector('body');

console.log(copyNumber);

copyNumber.addEventListener('click', () => {
    navigator.clipboard.writeText("+44 7472 404572").then(async function() {
        console.log('Copying to clipboard was successful!');
        copyNumber.textContent = 'Copied!';
        await sleep(1000);
        copyNumber.textContent = '+44 7472 404572';
    }, async function(err) {
        copyNumber.textContent = 'Failed to copy';
        await sleep(1000);
        copyNumber.textContent = '+44 7472 404572';
        console.error('Could not copy text: ', err);
    });
})

body.addEventListener('keypress', (event)=> {
    if (event.keyCode === 13) {
        navigator.clipboard.writeText("+44 7472 404572").then(async function() {
            console.log('Copying to clipboard was successful!');
            copyNumber.textContent = 'Copied!';
            await sleep(1000);
            copyNumber.textContent = '+44 7472 404572';
        }, async function(err) {
            copyNumber.textContent = 'Failed to copy';
            await sleep(1000);
            copyNumber.textContent = '+44 7472 404572';
            console.error('Could not copy text: ', err);
        });
    }
})