bodyElement.classList.remove('scroll');
homePage.classList.remove('fade');

console.clear();

/*--------------------------------------------------------------
TABLE OF CONTENTS
----------------------------------------------------------------
1.0 VARIABLES
    1.1 DOM ELEMENTS
    1.2 OTHER
2.0 STAR ANIMATION
    2.1 VARIABLES
    2.2 STAR CLASS
    2.3 FUNCTIONS
    2.4 EVENT LISTENERS
3.0 FUNCTIONS
    3.1 START PAGE
    3.2 FETCH GITHUB REPOS
--------------------------------------------------------------*/

/*--------------------------------------------------------------
1.0 VARIABLES
--------------------------------------------------------------*/

    /*------------------------------------------------------------
    |
    | 1.1 DOM ELEMENTS
    |
    ------------------------------------------------------------*/

const projects = document.querySelector('.project-container');
const headerDescription = document.querySelector('.header-description');

    /*------------------------------------------------------------
    |
    | 1.2 OTHER
    |
    ------------------------------------------------------------*/

const userReferrer = document.referrer;

/*--------------------------------------------------------------
2.0 STAR ANIMATION
--------------------------------------------------------------*/

    /*------------------------------------------------------------
    |
    | 2.1 VARIABLES
    |
    ------------------------------------------------------------*/

let numStars = (screen.availWidth > screen.availHeight) ? 500 : 200;
let stars = [];
let acceleration = 0.01;
let animationActive = true

    /*------------------------------------------------------------
    |
    | 2.2 STAR CLASS
    |
    ------------------------------------------------------------*/

class Star {
    constructor(x, y) {
        this.pos = createVector(x, y);
        this.prevPos = createVector(x, y);
        
        this.vel = createVector(0, 0);
        
        this.ang = atan2(y - (height/2), x - (width/2));
    }
    
    isActive() {
        return onScreen(this.prevPos.x, this.prevPos.y);
    }
    
    update(acc) {
        this.vel.x += cos(this.ang) * acc;
        this.vel.y += sin(this.ang) * acc;
        
        this.prevPos.x = this.pos.x;
        this.prevPos.y = this.pos.y;
        
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
    }
    
    draw() {
        const alpha = map(this.vel.mag(), 0, 3, 0, 255);
        stroke(255, alpha);
        line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
    }
}

    /*------------------------------------------------------------
    |
    | 2.3 FUNCTIONS
    |
    ------------------------------------------------------------*/
    
function setup() {
    if (animationActive) {
        createCanvas(window.innerWidth, window.innerHeight);
        stroke(255);
        strokeWeight(2);
        
        for(let i = 0; i < numStars; i++) {
            stars.push(new Star(random(width), random(height)));
        }
    }
}

function draw() {
    background(0, 50);
    
    //   const acc = map(mouseX, 0, width, 0.005, 0.2);
    
    stars = stars.filter(star => {
        star.draw();
        star.update(acceleration);
        return star.isActive();
    });
    
    if (animationActive) {
        while(stars.length < numStars) {
            stars.push(new Star(random(width), random(height)));
        }
    }
}

function onScreen(x, y) {
    return x >= 0 && x <= width && y >= 0 && y <= height;  
}

async function speedUp() {
    for(let i = 0; i < 30; i ++) {
        acceleration += 0.02;
        await sleep(30);
    }
    setTimeout(slowDown, 900);
}

async function slowDown() {
    for(let i = 0; i < 20; i ++) {
        acceleration -= 0.01;
        await sleep(30);
    }

    // After loading animation is finished
    animationActive = false;
    await sleep(1500);
    startPage();
}

    /*------------------------------------------------------------
    |
    | 2.4 EVENT LISTENERS
    |
    ------------------------------------------------------------*/

window.addEventListener('scroll', () => {
    let p5canvas = document.querySelector('.p5Canvas');

    if (!(p5canvas === null)) {
        p5canvas.remove();
    }
})

window.addEventListener('DOMContentLoaded', async () => {
    // Only trigger loading animation if new to website 
    fetchGithubRepos();
    if (userReferrer.startsWith('http://127.0.0.1:5500/') || userReferrer.startsWith('https://alexlostorto.github.io/') || userReferrer.startsWith('http://alexlostorto.github.io/')) {
        console.log("Start page")
        animationActive = false;
        await startPage();
    } else {
        console.log("Starting animation");
        speedUp();
    }
})

window.addEventListener('resize', () => {
    if (animationActive) {
        setup();
        stars = [];
    }
})

/*--------------------------------------------------------------
3.0 FUNCTIONS
--------------------------------------------------------------*/

    /*------------------------------------------------------------
    |
    | 3.1 START PAGE
    |
    ------------------------------------------------------------*/

async function startPage() {
    homePage.classList.add('active');
    bodyElement.classList.add('scroll');
    await sleep(500);
    try {
        remove();
    } catch(err) {console.log(err)}
    typewrite(headerDescription);
    homePage.classList.add('fade');
    console.clear();
    credits();
}
    
    /*------------------------------------------------------------
    |
    | 3.2 FETCH GITHUB REPOS
    |
    ------------------------------------------------------------*/

function createSpecialProject(url, repoName, description, language, colour) {
    if (colour.toLowerCase() == 'gold') {
        return `<a href="${url}" target="_blank"> <div class="contentbox cursor-hover" style="background-image: url('assets/images/gold-background.jpg'); background-size: cover;"> <img class="contentImage cursor-hover" src="assets/svg/file.png" /> <h2 class="cursor-hover"><strong class="cursor-hover">${repoName}</strong></h2><p class="cursor-hover">${description}</p><h6 class="cursor-hover">${language}</h6></div></a>`
    } else {
        return `<a href="${url}" target="_blank"> <div class="contentbox cursor-hover" style="background-image: url('assets/images/gold-background.jpg'); background-size: cover; filter: grayscale(1);"> <img class="contentImage cursor-hover" src="assets/svg/file.png" /> <h2 class="cursor-hover"><strong class="cursor-hover">${repoName}</strong></h2><p class="cursor-hover">${description}</p><h6 class="cursor-hover">${language}</h6></div></a>`
    }
}

function createProject(url, repoName, description, language) {
    const anchorElement = document.createElement('a');
    anchorElement.href = url;
    anchorElement.target = '_blank';

    const projectContainer = document.createElement('div');
    projectContainer.classList.add('contentbox');
    projectContainer.classList.add('cursor-hover');

    const fileIcon = document.createElement('img');
    projectContainer.classList.add('contentImage');
    fileIcon.classList.add('cursor-hover');
    fileIcon.src = 'assets/svg/file.png';

    const projectHeader = document.createElement('h2');
    projectHeader.classList.add('cursor-hover');

    const projectName = document.createElement('strong');
    projectName.classList.add('cursor-hover');
    projectName.textContent = repoName;

    const descriptionContainer = document.createElement('p');
    descriptionContainer.classList.add('cursor-hover');
    descriptionContainer.textContent = description;

    const languageContainer = document.createElement('h6');
    languageContainer.classList.add('cursor-hover');
    languageContainer.textContent = language;

    projectHeader.appendChild(projectName);
    projectContainer.appendChild(fileIcon);
    projectContainer.appendChild(projectHeader);
    projectContainer.appendChild(descriptionContainer);
    projectContainer.appendChild(languageContainer);
    anchorElement.appendChild(projectContainer);

    return anchorElement
}

async function fetchGithubRepos() {   
    let response = await fetch('https://api.github.com/users/alexlostorto/repos');
    let repoData = await response.json();
    let projectsContainer = document.querySelector(".horizontalscroller");
    let specialProjects = ['magic-notes', 'papersss','spanish-spelling-bee'];

    projectsContainer.innerHTML += createSpecialProject("https://github.com/alexlostorto/magic-notes", "Magic Notes", "Magic Notes - an extension to make learning on Sparx Maths more fun!", "Javascript", "gold");
    projectsContainer.innerHTML += createSpecialProject("https://github.com/alexlostorto/papersss", "Papersss", "Finding GCSE past papers has never been easier!", "Javascript", "silver");
    projectsContainer.innerHTML += createSpecialProject("https://github.com/alexlostorto/spanish-spelling-bee", "Spanish Spelling Bee", "Simple spanish spelling game.", "Python", "silver");

    for(let i = 0; i < repoData.length; i++) {
        if (repoData[i].name in specialProjects) { continue }

        let description = "Looks like I was forgotten...";
        let language = "ReadME";

        if(repoData[i].description != null) {
            description = repoData[i].description;
        }

        if(repoData[i].language != null) {
            language = repoData[i].language;
        }

        let project = createProject(repoData[i].html_url, repoData[i].name, description, language);
        projectsContainer.appendChild(project);
    }
}
