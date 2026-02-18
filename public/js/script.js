let songsList = [];
let currentIndex = -1;
let currentAudio = null;
let currentButton = null;
let isShuffle = false;
let repeatMode = "off";

const bpTitle = document.getElementById("bp-title");
const bpImage = document.getElementById("bp-image");
const bpPlay = document.getElementById("bp-play");

async function loadSongs() {
  try {
    const response = await fetch("/songs", {cache: "no-store"});
    songsList = await response.json();

        songsList = songsList.map(song => ({
      ...song,
      liked: false
    }));

    const savedLikes = JSON.parse(localStorage.getItem("likedSongs")) || [];

    songsList = songsList.map(song => ({
      ...song,
      liked: savedLikes.includes(song.title)
    }));

    renderSongs(songsList);
    console.log("Songs loaded: ", songsList);


    
  } catch (err) {
    console.error(err);
    document.getElementById("songs").innerHTML =
      "<p style='color:red'>Failed to load songs</p>";
  }
}
function renderSongs(list){
  const container = document.getElementById("songs");
    container.innerHTML = "";

    list.forEach((song, index) => {
      container.innerHTML += `
       
          <div class="card">
            <div class="image-wrapper">
              <img src="${song.image}" alt="${song.title}">
              <button class="play-btn" data-index = "${index}">▶</button>
              
            </div>
            <button class="like-btn" data-index="${index}">
              ${song.liked ?  "❤️" : "🤍"}
              </button>
            <div class="card-content">
              <h3>${song.title}</h3>
              <audio src="${song.audio}"></audio>
            </div>
          </div>
        
      `;
    });
}
/* ONE click handler*/
document.addEventListener("click", (e) => {

  // PLAY BUTTON
  if (e.target.classList.contains("play-btn")) {
    const index = parseInt(e.target.dataset.index);
    playSong(index);
    return;
  }

  // LIKE BUTTON
  if (e.target.classList.contains("like-btn")) {
    const index = parseInt(e.target.dataset.index);

    songsList[index].liked = !songsList[index].liked;

    saveLikedSongs();

    renderSongs(songsList);
    return;
  }

});



const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");

setInterval(() =>{
  if (currentAudio) {
    progress.max = currentAudio.duration || 0;
    progress.value = currentAudio.currentTime;

    currentTimeEl.textContent = formatTime(currentAudio.currentTime);
    durationEl.textContent = formatTime(currentAudio.duration);
  }
}, 500);

progress.addEventListener("input", () => {
  if (currentAudio) {
    currentAudio.currentTime = progress.value;
  }
})

volume.addEventListener("input", () => {
  if (currentAudio) {
    currentAudio.volume = volume.value;
  }
});

function formatTime(time) {
  if (!time) return "0:00";
  const minutes = Math.floor(time / 60);
  const second = Math.floor(time % 60)
    .toString()
    .padStart(2, "0");
    return `${minutes}:${second}`;
}

function playSong(index){
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    if (currentButton) currentButton.textContent = "▶";
  }
  
  const cards = document.querySelectorAll(".card");
  const card = cards[index];
  const audio = card.querySelector("audio");
  const button = card.querySelector(".play-btn");

  audio.play();
  button.textContent = "⏸";

  currentAudio = audio;
  currentButton = button;
  currentIndex = index;

  document.getElementById("bp-title").textContent = card.querySelector("h3").textContent;
  document.getElementById("bp-image").src = card.querySelector("img").src;
  document.getElementById("bp-play").textContent = "⏸";

  audio.onended = () => nextSong();
}

function nextSong() {
  if (currentIndex < songsList.length - 1){
    playSong(currentIndex + 1);
  }
}

function prevSong() {
  if (currentIndex > 0){
    playSong(currentIndex - 1);
  }
}

document.getElementById("bp-next").addEventListener("click", nextSong);
document.getElementById("bp-prev").addEventListener("click", prevSong);

document.getElementById("bp-play").addEventListener("click", () => {
  if (!currentAudio) return;

  if (currentAudio.paused) {
    currentAudio.play();
    currentButton.textContent = "⏸";
    document.getElementById("bp-play").textContent = "⏸";
  } else {
    currentAudio.pause();
    currentButton.textContent = "▶";
    document.getElementById("bp-play").textContent = "▶";
  }
});

document.getElementById("bp-shuffle").addEventListener("click", () => {
  isShuffle = !isShuffle;

  const btn = document.getElementById("bp-shuffle");

  if (isShuffle) {
    btn.style.color = "#4aa3ff";
  }else{
    btn.style.color = "white";
  }
});

document.getElementById("bp-repeat").addEventListener("click", () => {
  const btn = document.getElementById("bp-repeat");

  if (repeatMode === "off") {
    repeatMode = "all";
    btn.style.color = "#4aa3ff";
  } else if (repeatMode === "all") {
    repeatMode = "one";
    btn.textContent = "🔂";
  } else {
    repeatMode = "off";
    btn.textContent = "🔁";
    btn.style.color = "white";
  }
});
function nextSong() {

  if (repeatMode === "one") {
    playSong(currentIndex);
    return;
  }

  if (isShuffle) {
    const randomIndex = Math.floor(Math.random() * songsList.length);
    playSong(randomIndex);
    return;
  }

  if (currentIndex < songsList.length - 1) {
    playSong(currentIndex + 1);
  } else if (repeatMode === "all") {
    playSong(0);
  }
}

const searchInput = document.getElementById("search");

searchInput.addEventListener("input", function () {
  const value = this.value.toLowerCase();

  const filteredSongs = songsList.filter(function (song) {
    return song.title.toLowerCase().includes(value);
  });

  console.log("Filtered: ", filteredSongs);

  renderSongs(filteredSongs);
});

document.getElementById("nav-home").addEventListener("click", () => {
  renderSongs(songsList);
});

document.getElementById("nav-liked").addEventListener("click", () =>{
  const likedSongs = songsList.filter(song => song.liked);
  renderSongs(likedSongs);
});

function saveLikedSongs() {
  const likedSongs = songsList
  .filter(song => song.liked)
    .map(song => song.title);

    localStorage.setItem("likedSongs", JSON.stringify(likedSongs));
}

loadSongs();