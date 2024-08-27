// Element Selection
const audio = document.getElementById('audio');
const cover = document.getElementById('cover');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const playPauseBtn = document.getElementById('play-pause');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const progressContainer = document.getElementById('progress-bar');
const progressBar = document.querySelector('.progress-bar');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const downloadBtn = document.getElementById('download');
const coverContainer = document.querySelector('.cover-container');
const changeBgBtn = document.getElementById('change-background');
const backgroundVideo = document.getElementById('background-image');

// Song List
const songs = [
    {
        title: '晩餐歌 / Bansanka',
        artist: 'tuki × 優里 ',
        src: 'songs/1.mp3',
        cover: 'images/1.jpeg',
        video:'8.jpeg'
      },
      {
        title: 'W / X / Y',
        artist: '優里 × Tani Yuuki',
        src: 'songs/2.mp3',
        cover: 'images/2.jpeg',
        video:'3.jpg'
      },
      {
        title: 'ツキミソウ',
        artist: 'Novelbright',
        src: 'songs/3.mp3',
        cover: 'images/3.jpeg',
        video:'1.png'
      },
      {
        title: 'Harehare Ya',
        artist: 'Tiểu Mao',
        src: 'songs/4.mp3',
        cover: 'images/4.jpeg',
        video:'2.jpg'
      },
      {
        title: 'Dry Flowerドライフラワ',
        artist: '優里 Cover by Harutya',
        src: 'songs/5.mp3',
        cover: 'images/5.jpeg',
        video:'4.png'
      },
      {
        title: '天ノ弱',
        artist: 'Akie秋絵',
        src: 'songs/6.mp3',
        cover: 'images/6.jpeg',
        video:'5.jpg'
      },
      {
        title: 'Kokoronashi',
        artist: 'Gumi Cover by Shuang Sheng',
        src: 'songs/7.mp3',
        cover: 'images/7.jpeg',
        video:'9.jpeg'
      },
      {
        title: '花に亡霊',
        artist: 'ヨルシカ',
        src: 'songs/8.mp3',
        cover: 'images/8.jpeg',
        video:'6.jpg'
      },
      {
        title: 'キセキ',
        artist: 'GReeeeN',
        src: 'songs/9.mp3',
        cover: 'images/9.jpeg',
        video:'10.png'
      },
      {
        title: 'Sakura',
        artist: 'Funky Monkey Babys',
        src: 'songs/10.mp3',
        cover: 'images/10.jpeg',
        video: '7.jpg'
      },
];

let songIndex = 0;
let isPlaying = false;

// Load Song
function loadSong(song) {
    title.textContent = song.title;
    artist.textContent = song.artist;
    audio.src = song.src;
    cover.src = song.cover;
    backgroundVideo.src = song.video;
    downloadBtn.href = song.src;
    downloadBtn.download = `${song.title} - ${song.artist}`;
}

// Play Song
function playSong() {
    isPlaying = true;
    audio.play();
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    coverContainer.classList.remove('stopped');
    backgroundVideo.play();
}

// Pause Song
function pauseSong() {
    isPlaying = false;
    audio.pause();
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    coverContainer.classList.add('stopped');
    backgroundVideo.pause();
}

// Previous Song
function prevSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Next Song
function nextSong() {
    songIndex++;
    if (songIndex > songs.length - 1) {
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Update Progress Bar
function updateProgressBar(e) {
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement;
        const progressPercent = (currentTime / duration) * 100;
        progressBar.style.width = `${progressPercent}%`;

        // Calculate display for duration
        const durationMinutes = Math.floor(duration / 60);
        const durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationEl.textContent = `${durationMinutes}:0${durationSeconds}`;
        } else {
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }

        // Calculate display for current time
        const currentMinutes = Math.floor(currentTime / 60);
        const currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentTimeEl.textContent = `${currentMinutes}:0${currentSeconds}`;
        } else {
            currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`;
        }
    }
}

// Set Progress Bar
function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const { duration } = audio;
    audio.currentTime = (clickX / width) * duration;
}

// Change Background Manually
function changeBackgroundManually() {
    const randomIndex = Math.floor(Math.random() * songs.length);
    backgroundVideo.src = songs[randomIndex].video;
    backgroundVideo.play();
}

// Handle Keyboard Events for Next/Previous Song and Play/Pause
function handleKeyDown(e) {
    if (e.key === 'ArrowRight') {
        nextSong();
    } else if (e.key === 'ArrowLeft') {
        prevSong();
    } else if (e.code === 'Space') {
        e.preventDefault(); // Prevent the default action (e.g., scrolling down)
        isPlaying ? pauseSong() : playSong();
    }  else if (e.code === 'Enter') {
        e.preventDefault(); // Prevent the default action
        changeBackgroundManually();
    }
}

// Event Listeners
playPauseBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);

// Update Progress Bar
audio.addEventListener('timeupdate', updateProgressBar);

// Click on Progress Bar
progressContainer.parentElement.addEventListener('click', setProgressBar);

// Song Ends
audio.addEventListener('ended', nextSong);

// Change Background Button
changeBgBtn.addEventListener('click', changeBackgroundManually);

// Keyboard Events for Next/Previous Song and Play/Pause
document.addEventListener('keydown', handleKeyDown);

// On Load
loadSong(songs[songIndex]);
