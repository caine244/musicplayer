
const container = document.getElementById('container');
const cover = document.getElementById('cover');
const title = document.getElementById('title');
const singer = document.getElementById('artist');
const audio = document.getElementById('audio');
const playButton = document.getElementById('play');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const pauseButton = document.getElementById('pause');
const progresscontainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentime = document.getElementById('current-time');
const duration = document.getElementById('duration');
const muteBtn = document.getElementById('mute');
const volumeBar = document.getElementById('volume');
const playlist = document.getElementById('playlist-list');
const toggleBtn = document.getElementById('togglePlaylist');
const playlistlist = document.getElementById('playlist');




let musicPlayer = new MusicPlayer(musicList);

window.addEventListener('load', () => {
  let music = musicPlayer.getMusic();
  displayMusic(music);
  playButton.style.display = 'block';
  pauseButton.style.display = 'none';
  volumeBar.value = 100;
  audio.volume = 1;
  
})
function displayMusic(music) {
  title.innerText = music.getName();
  singer.innerText = music.singer;
  cover.src =  music.img;
  audio.src =  music.mp3;
  setActive();
  
  playButton.style.display = 'none';
  pauseButton.style.display = 'block';
}
playButton.addEventListener('click', () => {
  audio.play();
  playButton.style.display = 'none';
  pauseButton.style.display = 'block';
  isMusicplay(true);

});
prevButton.addEventListener('click', () => {
  musicPlayer.prev();
    let music = musicPlayer.getMusic();
    displayMusic(music);
})
nextButton.addEventListener('click', () => {
  musicPlayer.next();
    let music = musicPlayer.getMusic();
    displayMusic(music);
     isMusicplay(false);
    audio.play();
    playButton.style.display = 'none';

})
pauseButton.addEventListener('click', () => {
  audio.pause();
  playButton.style.display = 'block';
  pauseButton.style.display = 'none';
  isMusicplay(false);
})

function isMusicplay(deger) {
  if (deger == true) {
  container.classList.add('playing');
  } else {
    container.classList.remove('playing');
  }
}
audio.addEventListener("loadedmetadata", () => {
  duration.innerText = formatTime(audio.duration);
  progress.max = audio.duration;
})
formatTime = (time) => {
  let minute = Math.floor(time / 60);
  let second = Math.floor(time % 60);
  if (second < 10) {
    second = `0${second}`;
  }
  return `${minute}:${second}`;
}
audio.addEventListener('timeupdate', () => {
  progress.value = Math.floor(audio.currentTime);
  currentime.innerText = formatTime(audio.currentTime);
})
function setPlaylist() {
  musicList.forEach((music, index) => {
    let li = document.createElement('li');
    li.innerText = music.getName();
    li.setAttribute('data-index', index);
    playlist.appendChild(li);
    li.addEventListener('click', () => {
      musicPlayer.index = index;
      let music = musicPlayer.getMusic();
      displayMusic(music);
      audio.play();
      playButton.style.display = 'none';
      pauseButton.style.display = 'block';
      isMusicplay(true);
    });
  });
}
setPlaylist();

function setActive() {
  let allLi = playlist.querySelectorAll('li');
  allLi.forEach((li) => {
    li.classList.remove('active');
  })
  let currentLi = playlist.querySelector(`[data-index="${musicPlayer.index}"]`);
  currentLi.classList.add('active');
}
muteBtn.addEventListener('click', () => {
  if (audio.muted) {
    audio.muted = false;
    muteBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
    volumeBar.value = 100;
  } else {
    audio.muted = true;
    muteBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
    volumeBar.value = 0;
  }
})
volumeBar.addEventListener('input', (e) => {
  let volume = e.target.value;
  audio.volume = volume;
  console.log(volume);
  if (volume == 0) {
    muteBtn.innerHTML = '<i class="fa-solid fa-volume-xmark"></i>';
  } else {
    muteBtn.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
  }
})
toggleBtn.addEventListener('click', () => {
  playlist.classList.toggle('active');
  playlistlist.classList.toggle('active');
  if (playlist.classList.contains('active')) {
    toggleBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  } else {
    toggleBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';
  }
})
progress.addEventListener('input', (e) => {
  let value = e.target.value;
  audio.currentTime = value;
  currentime.innerText = formatTime(audio.currentTime);
})







