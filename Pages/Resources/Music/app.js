console.clear();
credits();

// FUNCTIONS 
function str_pad_left(string,pad,length) {
    return (new Array(length+1).join(pad)+string).slice(-length);
}


// PROGRAM 
const playButton = document.querySelector('.play-button');
const innerPlayButton = document.querySelector('.fa-play.delta');
const playButtonText = document.querySelector('.play-button span');
const loopButton = document.querySelector('.loop input');
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
let loopSong = false;

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
        // console.log(currentAudioTime);

        // Show current audio time 
        currentAudioTime += 1;
        let minutes = Math.floor(currentAudioTime / 60);
        let seconds = currentAudioTime - minutes * 60;
        audioCurrentTime.innerHTML = str_pad_left(minutes,'0',2)+':'+str_pad_left(seconds,'0',2);

        for (let s = 0; s < 10; s++) {
            if (!playingAudio) {return}
            if (currentAudioTime >= duration) {
                if (loopSong) {
                    loopCurrentSong();
                } else {
                    nextSong();
                }
                return
            }
            await sleep(100);
        }
    }
}

loopButton.addEventListener('change', () => {
    if (loopButton.checked) {
        loopSong = true;
    } else {
        loopSong = false
    }
})

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

async function loopCurrentSong() {
    await sleep(1000);

    // Pause audio 
    audio.pause();
    playingAudio = false;

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