async function loadSongs() {
    try {
        const response = await fetch("/songs");

        if (!response.ok) {
            throw new Error("Server error");
        }

        const songs = await response.json();
        const container = document.getElementById("songs");
        container.innerHTML = "";

        if (songs.length === 0) {
            container.innerHTML = "<p>No songs available</p>";
            return;
        }

        songs.forEach(song => {
            container.innerHTML += `
                <li>
                    <div class="card">
                        <img src="${song.image}" alt="${song.title}">
                        <div class="card-content">
                            <h3>${song.title}</h3>
                            <audio controls>
                                <source src="${song.audio}" type="audio/mpeg">
                            </audio>
                        </div>
                    </div>
                </li>
            `;
        });

        setupAudioControls();

    } catch (error) {
        console.error(error);
        document.getElementById("songs").innerHTML =
            "<p style='color:red;'>Failed to load songs</p>";
    }
}
                const audios = document.querySelectorAll("audio");

                audios.forEach(audio => {
                    audio.addEventListener("play", () => {
                        audios.forEach(otherAudio => {
                            if (otherAudio !== audio) {
                                otherAudio.pause();
                                otherAudio.closest(".card").classList.remove("playing");
                            }
                        });
                        audio.closest(".card").classList.add("playing");
                    });

                    audio.addEventListener("pause", () => {
                        audio.closest(".card").classList.remove("playing");
                    });
                });

function setupAudioControls() {
    const audios = document.querySelectorAll("audio");

    audios.forEach(audio => {
        audio.addEventListener("play", () => {
            audios.forEach(other => {
                if (other !== audio) {
                    other.pause();
                    other.closest(".card").classList.remove("playing");
                }
            });
            audio.closest(".card").classList.add("playing");
        });

        audio.addEventListener("pause", () => {
            audio.closest(".card").classList.remove("playing");
        });
    });
}
loadSongs();