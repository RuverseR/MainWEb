// DOM ELEMENTS 
const projects = document.querySelector('.project-container');
const headerDescription = document.querySelector('.header-description');

const userReferrer = document.referrer;

bodyElement.classList.remove('scroll');
homePage.classList.remove('fade');

console.clear();

// LOAD PAGE AFTER ANIMATION
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
    // console.log(userReferrer);
    credits();
    loadDoc();
}


// LOADING ANIMATION
let numStars = 500;
let stars = [];
let acceleration = 0.01;
let animationActive = true

// P5.js SETUP
function setup() {
    if (animationActive) {
        console.log(numStars);
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

window.addEventListener('scroll', (e) => {
    let p5canvas = document.querySelector('.p5Canvas');

    if (!(p5canvas === null)) {
        p5canvas.remove();
    }
})

window.addEventListener('DOMContentLoaded', async () => {
    // Only trigger loading animation if new to website 
    if (userReferrer.startsWith('http://127.0.0.1:5500/') || userReferrer.startsWith('https://alexlostorto.github.io/') || userReferrer.startsWith('http://alexlostorto.github.io/')) {
        console.log("Start page")
        animationActive = false;
        await startPage();
    } else {
        console.log("Starting animation");
        speedUp();
    }
    console.log(userReferrer);
})

window.addEventListener('resize', (e) => {
    if (animationActive) {
        setup();
        stars = [];
    }
})

// GET GITHUB REPO DATA
function loadDoc() {   
    var pageToVisit = "https://api.github.com/users/alexlostorto/repos";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {

            data=this.responseText;
            jsdata=JSON.parse(data);
            // console.log(jsdata);
            htmlToAppend="";

            length=jsdata.length;
            for(i=0;i<length;i++){

            desc="Looks like I was forgotten...";
            if(jsdata[i].description != null){
                desc=jsdata[i].description;
            }

            lang="ReadME";
            if(jsdata[i].language != null){
                lang=jsdata[i].language;
            }

            nameOfRepo=jsdata[i].name;
            htmlUrl=jsdata[i].html_url;

            htmlToAppend+='<a href="'+htmlUrl+'" target="_blank"> <div class="contentbox cursor-hover"> <img class="contentImage cursor-hover" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGgAAABoCAYAAAAdHLWhAAAABmJLR0QA/wD/AP+gvaeTAAADZklEQVR4nO3dQWtUVxjG8f+rKZquGhEFwYUpFb9ALUhdmI0i1GhcSDftQr+BXVQQdGEFK278CkK7cSMIIpW2NC50I6WIILhJ2xQsolJQIkYfF2NhOHNNRrx37hvv89vNyUnOyf3ryR0NM2BmZmZmZtYtsdQHJY0DB4DPgfU1rvsEuAFciIinNX7d7pC0W9LfatZdSdva/l5XHElfSFpsOM7/5iVtavt7zmrgiJO0DrgHTIxwH7PAVEQsjnDNFWGsYuwwg3F+An4Dnte07kHg077HO4GjwJmavv77S9LV4gj6sYE1PpI0V6zzVNLWutd670j6o7hwXza0zpSkF8VaNyRV/a3urFUVY+UFetbEwhHxM3C+GP4M+LaJ9Vaqtv+0HgemgS19YyckLQBz7WxpZB4DNyPiv6UmtRooIp5IOkzvJmT16+Ex4Gx7uxqpZ5IuAMci4kHVhKojbqQi4hfgZNv7aMka4AhwU9LmqgmtB3rtO+Bc25to0SRwUdJAj7Z/BgEQEQK+kXSF3vOwSZLsrSFjwFZgvG9sOzADXFzyMyXdKW59Z5rbZ3dJ2ijpdnGtfyjnZTniOici7jP4NGPgiboDtau8c/uwnOBAyTlQcg6U3DC3skclfQ+sa3ozHfMQuL/cpGEC7Xj3vViFCeDj5Sb5iEvOgZIb5ohboPffAtcB/85APcbo/SrbKWDtW31mxT/1nGpihwaSThfX+k45Z5gj7vcG9mY9t5abMEyglzVsxKote219k5CcAyXnQMk5UHIOlJwDJedAyTlQcg6UnAMl50DJOVByDpScAyXnQMk5UHIOlJwDJedAyTlQcg6UnAMl50DJOVByDpScAyXnQMk5UHIOlJwDJedAyTlQcg6UnAMl50DJOVByDpScAyXnQMk5UHIOlJwDJedAyTlQcg6UnAMl50DJOVByDpScAyXnQMk5UHIOlJwDJVcVqHx1+TWj2EhHla86P/DK/lWB/ikeT9e2HSvtLx7PlxOq3rvhGrC77/EhSeuBX4Hn9e2t0z4AdgFTxfi1cmKUA5ImgHv4DZ1G7QHwSUQ87h8cOOIi4hHwNX6nk1FaBL4q48Ab7uIi4jKwF/ir4Y0Z/AnsiYgrVR8cOOL6SRoH9gE7gQ31763T/gVmgUsRsdD2ZszMzMzMzLJ4BR1/81tLFuuIAAAAAElFTkSuQmCC" /> <h2 class="cursor-hover"><strong class="cursor-hover">'+nameOfRepo+'</strong></h2><p class="cursor-hover">'+desc+'</p><h6 class="cursor-hover">'+lang+'</h6></div></a>';

            }
            document.getElementsByClassName("horizontalscroller")[0].innerHTML=htmlToAppend;
        }
    };
    xhttp.open("GET", pageToVisit, true);
    xhttp.send();
}
