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

function str_pad_left(string,pad,length) {
    return (new Array(length+1).join(pad)+string).slice(-length);
}


// PROGRAM 
const playButton = document.querySelector('.play-button');
const innerPlayButton = document.querySelector('.fa-play.delta');
const playButtonText = document.querySelector('.play-button span');
const backButton = document.querySelector('.back-button');
const skipButton = document.querySelector('.skip-button');
const rewindButton = document.querySelector('.rewind-button');
const forwardButton = document.querySelector('.fast-forward-button');
const progressBar = document.querySelector('.progress-bar');
const audioCurrentTime = document.querySelector('.progress-time-current');
const audioTotalTime = document.querySelector('.progress-time-total');
const audioContainer = document.querySelector('.audio-container');
const audioPlayers = document.querySelectorAll('.audio-container div i');
const audioList = document.querySelectorAll('.audio-container audio');

let currentAudioTime = 0;
let progressBarWidth = 0;
let audioIndex = 1;
let audio = audioList[audioIndex];
let playingAudio = false;

async function audioProgress () {
    const duration = parseInt(audio.duration);
    const interval = 100 / duration;

    // Show total time 
    let minutes = Math.floor(duration / 60);
    let seconds = duration - minutes * 60;
    audioTotalTime.innerHTML = str_pad_left(minutes,'0',2)+':'+str_pad_left(seconds,'0',2);
    for (let i = 0; i < duration; i++) {
        // Audio progress bar 
        progressBarWidth += interval;
        progressBar.style.width = progressBarWidth + "%";
        console.log(currentAudioTime);

        // Show current audio time 
        currentAudioTime += 1;
        let minutes = Math.floor(currentAudioTime / 60);
        let seconds = currentAudioTime - minutes * 60;
        audioCurrentTime.innerHTML = str_pad_left(minutes,'0',2)+':'+str_pad_left(seconds,'0',2);

        for (let s = 0; s < 10; s++) {
            if (!playingAudio) {return}
            if (currentAudioTime >= duration) {
                nextSong();
                return
            }
            await sleep(100);
        }
    }
}

playButton.addEventListener('click', () => {
    if (!playingAudio) {
        audio.play();
        playingAudio = true;
        innerPlayButton.classList.remove('fa-play');
        innerPlayButton.classList.add('fa-pause');
        playButtonText.innerHTML = 'Pause';
        audioProgress();
        audioPlayers[audioIndex].classList.remove('hidden');
    } else {
        audio.pause();
        playingAudio = false;
        innerPlayButton.classList.remove('fa-pause');
        innerPlayButton.classList.add('fa-play');
        playButtonText.innerHTML = 'Play';
    }
})

forwardButton.addEventListener('click', () => {
    const duration = parseInt(audio.duration);
    if (currentAudioTime + 10 >= duration) {return}
    audio.currentTime += 10;
    currentAudioTime += 10;
    let minutes = Math.floor(currentAudioTime / 60);
    let seconds = currentAudioTime - minutes * 60;
    audioCurrentTime.innerHTML = str_pad_left(minutes,'0',2)+':'+str_pad_left(seconds,'0',2);

    // Audio progress bar 
    const interval = 100 / duration;
    progressBarWidth += interval * 10;
    progressBar.style.width = progressBarWidth + "%";
})

rewindButton.addEventListener('click', () => {
    const duration = parseInt(audio.duration);
    if (currentAudioTime - 10 <= 0) {return}
    audio.currentTime -= 10;
    currentAudioTime -= 10;
    let minutes = Math.floor(currentAudioTime / 60);
    let seconds = currentAudioTime - minutes * 60;
    audioCurrentTime.innerHTML = str_pad_left(minutes,'0',2)+':'+str_pad_left(seconds,'0',2);

    // Audio progress bar 
    const interval = 100 / duration;
    progressBarWidth -= interval * 10;
    progressBar.style.width = progressBarWidth + "%";
})

async function previousSong() {
    if (audioIndex > 0) {loop = false}
    else {loop = true}

    // Pause audio 
    audio.pause();
    playingAudio = false;

    if (!loop) {
        audioPlayers[audioIndex].classList.add('hidden');
        audioIndex -= 1;

        // Show audio playing 
        audioPlayers[audioIndex].classList.remove('hidden');
    } else {
        audioPlayers[audioIndex].classList.add('hidden');
        audioIndex = audioList.length - 1;

        // Show audio playing 
        audioPlayers[audioIndex].classList.remove('hidden');
    }

    currentAudioTime = 0;
    audio.currentTime = currentAudioTime;
    progressBarWidth = 0;
    audio = audioList[audioIndex];

    await sleep(100);

    // Play audio 
    audio.play();
    playingAudio = true;
    audioProgress(); 

    innerPlayButton.classList.remove('fa-play');
    innerPlayButton.classList.add('fa-pause');
    playButtonText.innerHTML = 'Pause';
}

async function nextSong() {
    if (audioIndex < audioList.length - 1) {loop = false}
    else {loop = true}

    // Pause audio 
    audio.pause();
    playingAudio = false;

    if (!loop) {
        audioPlayers[audioIndex].classList.add('hidden');
        audioIndex += 1;

        // Show audio playing 
        audioPlayers[audioIndex].classList.remove('hidden');
    } else {
        audioPlayers[audioIndex].classList.add('hidden');
        audioIndex = 0;

        // Show audio playing 
        audioPlayers[audioIndex].classList.remove('hidden');
    }

    currentAudioTime = 0;
    audio.currentTime = currentAudioTime;
    progressBarWidth = 0;
    audio = audioList[audioIndex];

    await sleep(100);

    // Play audio 
    audio.play();
    playingAudio = true;
    audioProgress(); 

    innerPlayButton.classList.remove('fa-play');
    innerPlayButton.classList.add('fa-pause');
    playButtonText.innerHTML = 'Pause';
}

backButton.addEventListener('click', async () => {
    previousSong();
})

skipButton.addEventListener('click', async () => {
    nextSong();
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