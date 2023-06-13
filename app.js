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

async function fetchGithubRepos() {   
    let response = await fetch('https://api.github.com/users/alexlostorto/repos');
    let repoData = await response.json();

    htmlToAppend = `<a href="https://github.com/alexlostorto/magic-notes" target="_blank"> <div class="contentbox cursor-hover" style="background-image: url('https://media.istockphoto.com/id/183041676/photo/golden-background.jpg?s=170667a&w=0&k=20&c=-tQOmvzFuppJ5MvcH5kdDOLUjiRV9Fg0DiTH01GKWjc='); background-size: cover;"> <img class="contentImage cursor-hover" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGgAAABoCAYAAAAdHLWhAAAABmJLR0QA/wD/AP+gvaeTAAADZklEQVR4nO3dQWtUVxjG8f+rKZquGhEFwYUpFb9ALUhdmI0i1GhcSDftQr+BXVQQdGEFK278CkK7cSMIIpW2NC50I6WIILhJ2xQsolJQIkYfF2NhOHNNRrx37hvv89vNyUnOyf3ryR0NM2BmZmZmZtYtsdQHJY0DB4DPgfU1rvsEuAFciIinNX7d7pC0W9LfatZdSdva/l5XHElfSFpsOM7/5iVtavt7zmrgiJO0DrgHTIxwH7PAVEQsjnDNFWGsYuwwg3F+An4Dnte07kHg077HO4GjwJmavv77S9LV4gj6sYE1PpI0V6zzVNLWutd670j6o7hwXza0zpSkF8VaNyRV/a3urFUVY+UFetbEwhHxM3C+GP4M+LaJ9Vaqtv+0HgemgS19YyckLQBz7WxpZB4DNyPiv6UmtRooIp5IOkzvJmT16+Ex4Gx7uxqpZ5IuAMci4kHVhKojbqQi4hfgZNv7aMka4AhwU9LmqgmtB3rtO+Bc25to0SRwUdJAj7Z/BgEQEQK+kXSF3vOwSZLsrSFjwFZgvG9sOzADXFzyMyXdKW59Z5rbZ3dJ2ijpdnGtfyjnZTniOici7jP4NGPgiboDtau8c/uwnOBAyTlQcg6U3DC3skclfQ+sa3ozHfMQuL/cpGEC7Xj3vViFCeDj5Sb5iEvOgZIb5ohboPffAtcB/85APcbo/SrbKWDtW31mxT/1nGpihwaSThfX+k45Z5gj7vcG9mY9t5abMEyglzVsxKote219k5CcAyXnQMk5UHIOlJwDJedAyTlQcg6UnAMl50DJOVByDpScAyXnQMk5UHIOlJwDJedAyTlQcg6UnAMl50DJOVByDpScAyXnQMk5UHIOlJwDJedAyTlQcg6UnAMl50DJOVByDpScAyXnQMk5UHIOlJwDJedAyTlQcg6UnAMl50DJOVByDpScAyXnQMk5UHIOlJwDJVcVqHx1+TWj2EhHla86P/DK/lWB/ikeT9e2HSvtLx7PlxOq3rvhGrC77/EhSeuBX4Hn9e2t0z4AdgFTxfi1cmKUA5ImgHv4DZ1G7QHwSUQ87h8cOOIi4hHwNX6nk1FaBL4q48Ab7uIi4jKwF/ir4Y0Z/AnsiYgrVR8cOOL6SRoH9gE7gQ31763T/gVmgUsRsdD2ZszMzMzMzLJ4BR1/81tLFuuIAAAAAElFTkSuQmCC" /> <h2 class="cursor-hover"><strong class="cursor-hover">Magic Notes</strong></h2><p class="cursor-hover">Magic Notes - an extension to make learning on Sparx Maths more fun!</p><h6 class="cursor-hover">Javascript</h6></div></a>`;

    for(let i = 0; i < repoData.length; i++) {
        let description = "Looks like I was forgotten...";
        let language = "ReadME";

        if(repoData[i].description != null) {
            description = repoData[i].description;
        }

        if(repoData[i].language != null) {
            language = repoData[i].language;
        }

        nameOfRepo = repoData[i].name;
        htmlUrl = repoData[i].html_url;

        htmlToAppend += '<a href="' + htmlUrl + '" target="_blank"> <div class="contentbox cursor-hover"> <img class="contentImage cursor-hover" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGgAAABoCAYAAAAdHLWhAAAABmJLR0QA/wD/AP+gvaeTAAADZklEQVR4nO3dQWtUVxjG8f+rKZquGhEFwYUpFb9ALUhdmI0i1GhcSDftQr+BXVQQdGEFK278CkK7cSMIIpW2NC50I6WIILhJ2xQsolJQIkYfF2NhOHNNRrx37hvv89vNyUnOyf3ryR0NM2BmZmZmZtYtsdQHJY0DB4DPgfU1rvsEuAFciIinNX7d7pC0W9LfatZdSdva/l5XHElfSFpsOM7/5iVtavt7zmrgiJO0DrgHTIxwH7PAVEQsjnDNFWGsYuwwg3F+An4Dnte07kHg077HO4GjwJmavv77S9LV4gj6sYE1PpI0V6zzVNLWutd670j6o7hwXza0zpSkF8VaNyRV/a3urFUVY+UFetbEwhHxM3C+GP4M+LaJ9Vaqtv+0HgemgS19YyckLQBz7WxpZB4DNyPiv6UmtRooIp5IOkzvJmT16+Ex4Gx7uxqpZ5IuAMci4kHVhKojbqQi4hfgZNv7aMka4AhwU9LmqgmtB3rtO+Bc25to0SRwUdJAj7Z/BgEQEQK+kXSF3vOwSZLsrSFjwFZgvG9sOzADXFzyMyXdKW59Z5rbZ3dJ2ijpdnGtfyjnZTniOici7jP4NGPgiboDtau8c/uwnOBAyTlQcg6U3DC3skclfQ+sa3ozHfMQuL/cpGEC7Xj3vViFCeDj5Sb5iEvOgZIb5ohboPffAtcB/85APcbo/SrbKWDtW31mxT/1nGpihwaSThfX+k45Z5gj7vcG9mY9t5abMEyglzVsxKote219k5CcAyXnQMk5UHIOlJwDJedAyTlQcg6UnAMl50DJOVByDpScAyXnQMk5UHIOlJwDJedAyTlQcg6UnAMl50DJOVByDpScAyXnQMk5UHIOlJwDJedAyTlQcg6UnAMl50DJOVByDpScAyXnQMk5UHIOlJwDJedAyTlQcg6UnAMl50DJOVByDpScAyXnQMk5UHIOlJwDJVcVqHx1+TWj2EhHla86P/DK/lWB/ikeT9e2HSvtLx7PlxOq3rvhGrC77/EhSeuBX4Hn9e2t0z4AdgFTxfi1cmKUA5ImgHv4DZ1G7QHwSUQ87h8cOOIi4hHwNX6nk1FaBL4q48Ab7uIi4jKwF/ir4Y0Z/AnsiYgrVR8cOOL6SRoH9gE7gQ31763T/gVmgUsRsdD2ZszMzMzMzLJ4BR1/81tLFuuIAAAAAElFTkSuQmCC" /> <h2 class="cursor-hover"><strong class="cursor-hover">' + nameOfRepo + '</strong></h2><p class="cursor-hover">' + description + '</p><h6 class="cursor-hover">' + language + '</h6></div></a>';
    }

    document.querySelector(".horizontalscroller").innerHTML = htmlToAppend;
}
