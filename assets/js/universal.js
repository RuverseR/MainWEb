/*--------------------------------------------------------------
TABLE OF CONTENTS
----------------------------------------------------------------
1.0 VARIABLES
    1.1 DOM ELEMENTS
2.0 FUNCTIONS
    2.1 ESSENTIAL
    2.2 VIEW COUNTER
    2.3 FADERS
    2.4 TYPEWRITER
3.0 NAVIGATION
    3.1 HAMBURGER FUNCTIONALITY
4.0 CUSTOM CURSOR
    4.1 DETECT DEVICE
    4.2 CURSOR
--------------------------------------------------------------*/

/*--------------------------------------------------------------
1.0 VARIABLE
--------------------------------------------------------------*/

    /*------------------------------------------------------------
    |
    | 1.1 DOM ELEMENTS
    |
    ------------------------------------------------------------*/

const homePage = document.querySelector('.body-container');
const bodyElement = document.querySelector('body');
const toggleButton = document.querySelector('.toggle-button');
const resourcesButton = document.querySelector('.resources-button');
const recourcesLinks = document.querySelector('.nav-resources');
const subcategoryButton = document.querySelector('.subcategory-button');
const navbarItems = document.querySelector('.navbar-items');
const cursor = document.querySelector('.custom-cursor');
const cursorInner = document.querySelector('.custom-cursor.inner');
const cursorOuter = document.querySelector('.custom-cursor.outer');

bodyElement.classList.add('scroll');
homePage.classList.add('fade');

/*--------------------------------------------------------------
2.0 FUNCTIONS
--------------------------------------------------------------*/

    /*------------------------------------------------------------
    |
    | 2.1 ESSENTIAL
    |
    ------------------------------------------------------------*/

const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

    /*------------------------------------------------------------
    |
    | 2.2 VIEW COUNTER
    |
    ------------------------------------------------------------*/

async function liveViews() {
    let response = await(await (fetch("https://api.countapi.xyz/hit/alexlostorto.github.io/visits"))).json();
    visitsCounter = document.getElementById('visits');

    if (visitsCounter !== null) {
        visitsCounter.innerText = response.value + " 👀";
    } else { return }
}

liveViews()

    /*------------------------------------------------------------
    |
    | 2.3 FADERS
    |
    ------------------------------------------------------------*/

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

    /*------------------------------------------------------------
    |
    | 2.4 TYPEWRITER
    |
    ------------------------------------------------------------*/

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

    /*------------------------------------------------------------
    |
    | 2.5 CREDITS
    |
    ------------------------------------------------------------*/

function credits() {
    console.log.apply(console, ["%c Thanks for stopping by! I\u2019m currently looking to expand my programming knowledge and work with other like-minded devs. ","color: #fff; background: #8000ff; padding:5px 0;"])
    console.log.apply(console, ["%c Designed and Developed by Alex lo Storto %c\ud83d\ude80 ","color: #fff; background: #8000ff; padding:5px 0;","color: #fff; background: #242424; padding:5px 0 5px 5px;"])
}

/*--------------------------------------------------------------
3.0 NAVIGATION
--------------------------------------------------------------*/

    /*------------------------------------------------------------
    |
    | 3.1 HAMBURGER FUNCTIONALITY
    |
    ------------------------------------------------------------*/

toggleButton.addEventListener('click', () => {
    navbarItems.classList.toggle('active');
})

resourcesButton.addEventListener('click', () => {
    recourcesLinks.classList.toggle('active');
})

subcategoryButton.addEventListener('click', (event) => {
    event.stopPropagation();
    subcategoryButton.classList.toggle('active');
})

/*--------------------------------------------------------------
4.0 CUSTOM CURSOR
--------------------------------------------------------------*/

    /*------------------------------------------------------------
    |
    | 4.1 DETECT DEVICE
    |
    ------------------------------------------------------------*/

let orientationLandscape = (screen.availWidth > screen.availHeight);
let isMobile = (navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/iPhone/i));
let coarsePointer = window.matchMedia("(any-pointer:coarse)").matches;

if (orientationLandscape || (!isMobile) || coarsePointer) { enableCustomMouse(); }

window.addEventListener("touchstart", detectTouch);

function detectTouch() {  // If a touch is detected, make sure the custom cursor is disabled 
    console.log("isMobile");
    window.removeEventListener("touchstart", detectTouch);
}

    /*------------------------------------------------------------
    |
    | 4.2 CURSOR
    |
    ------------------------------------------------------------*/

window.addEventListener('mousemove', updateCustomCursor)

function detectTouch() {  // If a touch is detected, make sure the custom cursor is disabled 
    console.log("isMobile");
    window.removeEventListener("touchstart", detectTouch);
}

function enableCustomMouse() {
    cursor.style.display = 'block';
    cursorInner.style.display = 'block';
    cursorOuter.style.display = 'block';
}

function toggleCursorHover(e) {
    const target = e.target;
    
    const isLinkTag = target.tagName.toLowerCase() === 'a'  || target.classList.contains('cursor-hover');
    const isHovered = cursorInner.classList.contains('hoveredCursor');
    
    // Toggle the cursor class if necessary 
    if(isLinkTag && !isHovered) {
        cursorInner.classList.add('hoveredCursor');
    } else if(!isLinkTag && isHovered) {
        cursorInner.classList.remove('hoveredCursor');
    }
}

function positionCustomCursor(e) {  // Whenever a mouse movement is detected, update the custom cursor position
    cursorInner.style.left = e.pageX + 'px';
    cursorInner.style.top = e.pageY - window.scrollY + 'px';

    cursorOuter.style.left = e.pageX + 'px';
    cursorOuter.style.top = e.pageY - window.scrollY + 'px';
}

function updateCustomCursor(e) {
    toggleCursorHover(e);
    positionCustomCursor();
} 
