console.clear();
credits();

const sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

const homePage = document.querySelector('.body-container');
const projects = document.querySelector('.project-container');
const bodyElement = document.querySelector('body');
const headerDescription = document.querySelector('.header-description')
const cursor = document.querySelector('.custom-cursor');
const cursorJquery = $('#cursor');
const cursorInner = document.querySelector('.custom-cursor.inner');
const cursorOuter = document.querySelector('.custom-cursor.outer');

const quotes = [
    'Enjoy the little things',
    'Sm;)e',
    'Hello there!',
    'Nice to meet you!',
    'I hope we meet again :)',
    '/ᐠ ̥  ̮  ̥ ᐟ\\ฅ'
]

let quote = quotes[Math.floor(Math.random() * quotes.length)];
let i = 0;
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

function liveViews(response) {
    document.getElementById('visits').innerText = response.value + " 👀";
}

async function startPage() {
    homePage.classList.add('active');
    projects.classList.add('active');
    bodyElement.classList.add('scroll');
    await sleep(500);
    try {
        remove();
    } catch(err) {console.log(err)}
    typewrite(headerDescription);
    homePage.classList.add('fade');
    projects.classList.add('fade');
    console.clear();
    credits();
    loadDoc();
}

// Star field loading animation

let numStars = 500;
let stars = [];
let acceleration = 0.01;
let animationActive = true

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
    numStars = 200;
}

function setup() {
    try {
        console.log(numStars);
        createCanvas(window.innerWidth, window.innerHeight);
        stroke(255);
        strokeWeight(2);
        
        for(let i = 0; i < numStars; i++) {
            stars.push(new Star(random(width), random(height)));
        }
    } catch (err) {console.log(err)}
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
    // console.log("Speeding up")
    for(let i = 0; i < 50; i ++) {
        acceleration += 0.01;
        // console.log(acceleration);
        await sleep(30);
    }
    setTimeout(slowDown, 1500);
}

async function slowDown() {
    // console.log("Slowing down")
    for(let i = 0; i < 40; i ++) {
        acceleration -= 0.01;
        // console.log(acceleration);
        await sleep(30);
    }
    // After loading animation is finished
    animationActive = false;
    await sleep(3000);
    startPage();
}

window.addEventListener('mousemove', (e) => {
    const target = $(event.target);
    
    const isLinkTag = target.is('a') || target.is('.socials-container img') || target.is('.contextbox');
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

window.addEventListener('DOMContentLoaded', () => {
    setTimeout(speedUp, 500)
})

window.addEventListener('resize', (e) => {
    setup();
    stars = [];
})

function credits() {
    console.log.apply(console, ["%c Thanks for stopping by! I\u2019m currently looking to expand my programming knowledge and work with other like-minded devs. ","color: #fff; background: #8000ff; padding:5px 0;"])
    console.log.apply(console, ["%c Designed and Developed by Alex lo Storto %c\ud83d\ude80 ","color: #fff; background: #8000ff; padding:5px 0;","color: #fff; background: #242424; padding:5px 0 5px 5px;"])
}

function loadDoc() {   
    var pageToVisit = "https://api.github.com/users/alexlostorto/repos";
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {

        data=this.responseText;
        jsdata=JSON.parse(data);
        console.log(jsdata);
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

          htmlToAppend+='<a href="'+htmlUrl+'" target="_blank"> <div class="contentbox"> <img class="contentImage" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGgAAABoCAYAAAAdHLWhAAAABmJLR0QA/wD/AP+gvaeTAAADZklEQVR4nO3dQWtUVxjG8f+rKZquGhEFwYUpFb9ALUhdmI0i1GhcSDftQr+BXVQQdGEFK278CkK7cSMIIpW2NC50I6WIILhJ2xQsolJQIkYfF2NhOHNNRrx37hvv89vNyUnOyf3ryR0NM2BmZmZmZtYtsdQHJY0DB4DPgfU1rvsEuAFciIinNX7d7pC0W9LfatZdSdva/l5XHElfSFpsOM7/5iVtavt7zmrgiJO0DrgHTIxwH7PAVEQsjnDNFWGsYuwwg3F+An4Dnte07kHg077HO4GjwJmavv77S9LV4gj6sYE1PpI0V6zzVNLWutd670j6o7hwXza0zpSkF8VaNyRV/a3urFUVY+UFetbEwhHxM3C+GP4M+LaJ9Vaqtv+0HgemgS19YyckLQBz7WxpZB4DNyPiv6UmtRooIp5IOkzvJmT16+Ex4Gx7uxqpZ5IuAMci4kHVhKojbqQi4hfgZNv7aMka4AhwU9LmqgmtB3rtO+Bc25to0SRwUdJAj7Z/BgEQEQK+kXSF3vOwSZLsrSFjwFZgvG9sOzADXFzyMyXdKW59Z5rbZ3dJ2ijpdnGtfyjnZTniOici7jP4NGPgiboDtau8c/uwnOBAyTlQcg6U3DC3skclfQ+sa3ozHfMQuL/cpGEC7Xj3vViFCeDj5Sb5iEvOgZIb5ohboPffAtcB/85APcbo/SrbKWDtW31mxT/1nGpihwaSThfX+k45Z5gj7vcG9mY9t5abMEyglzVsxKote219k5CcAyXnQMk5UHIOlJwDJedAyTlQcg6UnAMl50DJOVByDpScAyXnQMk5UHIOlJwDJedAyTlQcg6UnAMl50DJOVByDpScAyXnQMk5UHIOlJwDJedAyTlQcg6UnAMl50DJOVByDpScAyXnQMk5UHIOlJwDJedAyTlQcg6UnAMl50DJOVByDpScAyXnQMk5UHIOlJwDJVcVqHx1+TWj2EhHla86P/DK/lWB/ikeT9e2HSvtLx7PlxOq3rvhGrC77/EhSeuBX4Hn9e2t0z4AdgFTxfi1cmKUA5ImgHv4DZ1G7QHwSUQ87h8cOOIi4hHwNX6nk1FaBL4q48Ab7uIi4jKwF/ir4Y0Z/AnsiYgrVR8cOOL6SRoH9gE7gQ31763T/gVmgUsRsdD2ZszMzMzMzLJ4BR1/81tLFuuIAAAAAElFTkSuQmCC" /> <h2><strong>'+nameOfRepo+'</strong></h2><p>'+desc+'</p><h6>'+lang+'</h6></div></a>';

        }
        document.getElementsByClassName("horizontalscroller")[0].innerHTML=htmlToAppend;
    }
  };
  xhttp.open("GET", pageToVisit, true);
  xhttp.send();
}