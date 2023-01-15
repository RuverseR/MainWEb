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

function round(number, decimalPlaces) {
    return Number(Math.round(number + "e" + decimalPlaces) + "e-" + decimalPlaces)
}


// PROGRAM
const inputA = document.querySelector('#a');
const inputB = document.querySelector('#b');
const inputC = document.querySelector('#c');
const inputAlpha = document.querySelector('#alpha');
const inputBeta = document.querySelector('#beta');
const output = document.querySelector('#output');

let changedVariables = [];

async function trigonometry() {
    if (changedVariables.length <= 1) { return }

    const inputs = [changedVariables[changedVariables.length - 1], changedVariables[changedVariables.length - 2]];
    console.log(inputs.join(', '));

    // Computation

    function toRadians(degrees) {
        return degrees * Math.PI/180;
    }

    function toDegrees(radians) {
        return radians * 180/Math.PI;
    }

    const a = inputA.value;
    const b = inputB.value;
    const c = inputC.value;
    const alpha = inputAlpha.value;
    const beta = inputBeta.value;

    let aValue = inputA.value;
    let bValue = inputB.value;
    let cValue = inputC.value;
    let alphaValue = inputAlpha.value;
    let betaValue = inputBeta.value;

    // input a 
    if (inputs.includes('a') && inputs.includes('b')) {
        cValue = round((a**2 + b**2) ** (0.5), 3);
        alphaValue = round(toDegrees(Math.atan(a / b)), 3);
        betaValue = round(toDegrees(Math.atan(b / a)), 3);
    } else if (inputs.includes('a') && inputs.includes('c')) {
        bValue = round((c**2 - a**2) ** (0.5), 3);
        alphaValue = round(toDegrees(Math.asin(a / c)), 3);
        betaValue = round(toDegrees(Math.acos(a / c)), 3);
    } else if (inputs.includes('a') && inputs.includes('alpha')) {
        bValue = round(a / (Math.tan(toRadians(alpha))), 3);
        cValue = round(a / (Math.sin(toRadians(alpha))), 3);
        betaValue = round(toDegrees(Math.atan((a / Math.tan(toRadians(alpha))) / a)), 3);
    } else if (inputs.includes('a') && inputs.includes('beta')) {
        bValue = round(a * (Math.tan(toRadians(beta))), 3);
        cValue = round(a / (Math.cos(toRadians(beta))), 3);
        alphaValue = round(toDegrees(Math.atan(a / (a * Math.tan(toRadians(beta))))), 3);
    }

    // input b 
    else if (inputs.includes('b') && inputs.includes('c')) {
        aValue = round((c**2 - b**2) ** (0.5), 3);
        alphaValue = round(toDegrees(Math.acos(b / c)), 3);
        betaValue = round(toDegrees(Math.asin(b / c)), 3);
    } else if (inputs.includes('b') && inputs.includes('alpha')) {
        aValue = round(b * Math.tan(toRadians(alpha)), 3);
        cValue = round(b / Math.cos(toRadians(alpha)), 3);
        betaValue = round(toDegrees(Math.atan(b / (b * Math.tan(toRadians(alpha))))), 3);
    } else if (inputs.includes('b') && inputs.includes('beta')) {
        aValue = round(b / (Math.tan(toRadians(beta))), 3);
        cValue = round(b / (Math.sin(toRadians(beta))), 3);
        alphaValue = round(toDegrees(Math.atan((b / (Math.tan(toRadians(beta)))) / b)), 3);
    }

    // input c 
    else if (inputs.includes('c') && inputs.includes('alpha')) {
        aValue = round(c * Math.sin(toRadians(alpha)), 3);
        bValue = round(c * Math.cos(toRadians(alpha)), 3);
        betaValue = round(toDegrees(Math.acos((c * Math.sin(toRadians(alpha))) / c)), 3);
    } else if (inputs.includes('c') && inputs.includes('beta')) {
        aValue = round(c * Math.cos(toRadians(beta)), 3);
        bValue = round(c * Math.sin(toRadians(beta)), 3);
        alphaValue = round(toDegrees(Math.asin((c * Math.cos(toRadians(beta))) / c)), 3);
    }

    // input alpha 
    else if (inputs.includes('alpha') && inputs.includes('beta')) {
        output.innerHTML = '<span class="orange-text">Hint</span>: Try adding the length of a <span class="orange-text">side</span>.';
        await sleep(2000);
        output.innerHTML = '<span class="orange-text">Hint</span>: Angles are calculated in <span class="orange-text">degrees</span>.';
    }

    inputA.value = aValue;
    inputB.value = bValue;
    inputC.value = cValue;
    inputAlpha.value = alphaValue;
    inputBeta.value = betaValue;

    if (isNaN(aValue) || isNaN(bValue) || isNaN(cValue) || isNaN(alphaValue) || isNaN(betaValue)) {
        output.innerHTML = '<span class="orange-text">Error</span>: Angle α and Angle β must be <span class="orange-text">bigger</span> than <span class="orange-text">zero</span>.';
        await sleep(2000);
        output.innerHTML = '<span class="orange-text">Hint</span>: Angles are calculated in <span class="orange-text">degrees</span>.';
    }
}

inputA.oninput = function() {
    if (changedVariables.length == 0 || changedVariables[changedVariables.length - 1] != 'a') {
        changedVariables.push('a');
    }
    trigonometry();
}

inputB.oninput = function() {
    if (changedVariables.length == 0 || changedVariables[changedVariables.length - 1] != 'b') {
        changedVariables.push('b');
    }
    trigonometry();
}

inputC.oninput = function() {
    if (changedVariables.length == 0 || changedVariables[changedVariables.length - 1] != 'c') {
        changedVariables.push('c');
    }
    trigonometry();
}

inputAlpha.oninput = function() {
    if (changedVariables.length == 0 || changedVariables[changedVariables.length - 1] != 'alpha') {
        changedVariables.push('alpha');
    }    trigonometry();
}

inputBeta.oninput = function() {
    if (changedVariables.length == 0 || changedVariables[changedVariables.length - 1] != 'beta') {
        changedVariables.push('beta');
    }    trigonometry();
}


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