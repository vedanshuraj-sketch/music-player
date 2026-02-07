let currentAudio = null;
let currentButton = null;

const bpTitle = document.getElementById("bp-title");
const bpImage = document.getElementById("bp-image");
const bpPlay = document.getElementById("bp-play");

async function loadSongs() {
  try {
    const response = await fetch("/songs");
    const songs = await response.json();

    const container = document.getElementById("songs");
    container.innerHTML = "";

    songs.forEach(song => {
      container.innerHTML += `
       
          <div class="card">
            <div class="image-wrapper">
              <img src="${song.image}" alt="${song.title}">
              <button class="play-btn">▶</button>
            </div>

            <div class="card-content">
              <h3>${song.title}</h3>
              <audio src="${song.audio}"></audio>
            </div>
          </div>
        
      `;
    });
  } catch (err) {
    console.error(err);
    document.getElementById("songs").innerHTML =
      "<p style='color:red'>Failed to load songs</p>";
  }
}

/* ONE click handler*/
document.addEventListener("click", (e) => {
  if (!e.target.classList.contains("play-btn")) return;

  const card = e.target.closest(".card");
  const audio = card.querySelector("audio");
  const button = e.target;

  // Same song → toggle
  if (currentAudio === audio) {
    if (audio.paused) {
      audio.play();
      button.textContent = "⏸";
      bpPlay.textContent = "⏸";
    } else {
      audio.pause();
      button.textContent = "▶";
      bpPlay.textContent = "▶"; 
    }
    return;
  }

  // Stop previous song
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentButton.textContent = "▶";
  }

  // Play new song
  audio.play();
  button.textContent = "⏸";

  bpTitle.textContent = card.querySelector("h3").textContent;
  bpImage.src = card.querySelector("img").src;
  bpPlay.textContent = "⏸";

  currentAudio = audio;
  currentButton = button;
});

bpPlay.addEventListener("click", () => {
  if (!currentAudio) return;

  if (currentAudio.paused) {
    currentAudio.play();
    bpPlay.textContent = "⏸";
    currentButton.textContent = "⏸";
  } else {
    currentAudio.pause();
    bpPlay.textContent = "▶";
    currentButton.textContent = "▶";
  }
});

loadSongs();