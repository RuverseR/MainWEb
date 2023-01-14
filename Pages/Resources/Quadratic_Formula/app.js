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
const inputA = document.querySelector('#a');
const inputB = document.querySelector('#b');
const inputC = document.querySelector('#c');
const output = document.querySelector('#output');

function quadraticSolve(a, b, c) {
    var discriminant = ((b*b)-(4*a*c))**(1/2)
    var solutions = [((-b+discriminant)/(2*a)),((-b-discriminant)/(2*a))]
    console.log(solutions.join(' '));
    return solutions
}

function displayQuadratic() {
    if ((inputA && inputA.value) && (inputB && inputB.value) && (inputC && inputC.value)) {
        solutions = quadraticSolve(inputA.value, inputB.value, inputC.value)
        output.innerHTML = "loading...";
        if (isNaN(solutions[0]) || isNaN(solutions[1])) {
          for (i = 0; i < solutions.length; i++) {
            solutions[i] = 'x = ' + solutions[i];
          }
          output.innerHTML = solutions.join('&nbsp;&nbsp;&nbsp;&nbsp; ') + "<br><br>This happened because you tried to get the square root of a negative number.<br><br>Hint: Try increasing the value of b."
        }
        else {
          output.innerHTML = `<span class="orange-text">x</span> = ${solutions[0]}&nbsp;&nbsp;&nbsp;&nbsp; <span class="orange-text">x</span> = ${solutions[1]}`
        }
      }
}

inputA.oninput = function() {
    displayQuadratic();
}

inputB.oninput = function() {
    displayQuadratic();
}

inputC.oninput = function() {
    displayQuadratic();
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