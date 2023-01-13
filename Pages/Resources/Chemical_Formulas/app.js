// DOM ELEMENTS 
const homePage = document.querySelector('.body-container');
const toggleButton = document.querySelector('.toggle-button');
const resourcesButton = document.querySelector('.resources-button');
const recourcesLinks = document.querySelector('.nav-resources');
const navbarItems = document.querySelector('.navbar-items');
const bodyElement = document.querySelector('body');
const cursor = document.querySelector('.custom-cursor');
const cursorJquery = $('#cursor');
const cursorInner = document.querySelector('.custom-cursor.inner');
const cursorOuter = document.querySelector('.custom-cursor.outer');

console.clear();

const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

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


// FADE IN ON SCROLL
const faders = document.querySelectorAll('.fade-in');
const appearOptions = {
    threshold: 1,
    rootMargin: "0px 0px -100px 0px"
};
const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return
        } else {
            entry.target.classList.add('appear');
            appearOnScroll.unobserve(entry.target);
        }
    })
}, appearOptions);

faders.forEach(fader => {
    appearOnScroll.observe(fader);
})


// TYPEWRITER 
let speed = 100;
async function typewrite(element) {
    let text = element.innerHTML;
    element.innerHTML = '';
    element.style.visibility = 'visible';

    for (let i = 0; i < text.length; i++) {
        await sleep(speed);
        element.innerHTML += text.charAt(i);
    }

    element.style['border-right'] = '0px';
}


// WEBSITE VIEWS
function liveViews(response) {
    document.getElementById('visits').innerText = response.value + " 👀";
}

bodyElement.classList.add('scroll');
homePage.classList.add('fade');
console.clear();
credits();

// Check if mobile or desktop 
let isDesktop = true;
if (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPhone/i)) {
    isDesktop = false;
}
let isMobile = window.matchMedia("(any-pointer:coarse)").matches;
if (!isMobile && isDesktop) {
    console.log("Desktop");
    cursor.style.display = 'block';
    cursorInner.style.display = 'block';
    cursorOuter.style.display = 'block';
} else {
    console.log("Mobile");
}


// CUSTOM CURSOR AND HOVER
window.addEventListener('mousemove', (e) => {
    const target = $(e.target);
    
    const isLinkTag = target.is('a');
    const isHovered = cursorJquery.hasClass('hoveredCursor');
    
    // Toggle the cursor class if necessary 
    if(isLinkTag && !isHovered) {
        cursorJquery.addClass('hoveredCursor');
    } else if(!isLinkTag && isHovered) {
        cursorJquery.removeClass('hoveredCursor');
    }

    cursorInner.style.left = e.pageX + 'px';
    cursorInner.style.top = e.pageY - window.scrollY + 'px';

    cursorOuter.style.left = e.pageX + 'px';
    cursorOuter.style.top = e.pageY - window.scrollY + 'px';
})

window.addEventListener('scroll', (e) => {
    cursorInner.style.left = e.pageX + 'px';
    cursorInner.style.top = e.pageY - window.scrollY + 'px';

    cursorOuter.style.left = e.pageX + 'px';
    cursorOuter.style.top = e.pageY - window.scrollY + 'px';
})


// LOG CREDITS IN CONSOLE
function credits() {
    console.log.apply(console, ["%c Thanks for stopping by! I\u2019m currently looking to expand my programming knowledge and work with other like-minded devs. ","color: #fff; background: #8000ff; padding:5px 0;"])
    console.log.apply(console, ["%c Designed and Developed by Alex lo Storto %c\ud83d\ude80 ","color: #fff; background: #8000ff; padding:5px 0;","color: #fff; background: #242424; padding:5px 0 5px 5px;"])
}


// HAMBURGER FUNCTIONALITY
toggleButton.addEventListener('click', () => {
    console.log("Clicked");
    navbarItems.classList.toggle('active');
})

resourcesButton.addEventListener('click', () => {
    console.log("Clicked");
    recourcesLinks.classList.toggle('active')
})