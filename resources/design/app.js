console.clear();
credits();

const copyButton = document.querySelector('.copy-button');

copyButton.addEventListener('click', () => {copy('Nothing here!', copyButton, message='Copied!', initialText='Copy', errorMessage='Failed to copy', delay=1000)})