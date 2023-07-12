
const song_titles = document.querySelectorAll(".music_title");
const song_artists = document.querySelectorAll(".music_artist");
const cards = document.querySelectorAll(".music_card");
const albums = document.querySelectorAll(".music_album");
const randos = Math.random()*10;
const audio = document.querySelectorAll("audio");
const addSongForm = document.getElementById('addSongForm');
const musicContainer = document.getElementById('music_container');
console.log(song_artists);

document.addEventListener("DOMContentLoaded", () => {
    if(randos < 2){
        ambilData().reject;
        alert("Gagal loading data, tolong refresh halaman");
        cards.forEach((card) => {
            card.classList.add("cursor-not-allowed");
        })
    }
    else{
        ambilData()
        .then((json) => {
            for(let i = 0;i < song_titles.length;i++){
                song_titles[i].innerText = json[i].title;
                song_artists[i].innerText = json[i].artist;
                albums[i].setAttribute("src", json[i].cover);
                audio[i].setAttribute("src", json[i].path);
                console.log(json[i].title);
            }
            console.log(json);
        })
    }

    function pauseAllAudioExcept(currentAudio) {
        audio.forEach((audio) => {
          if (audio !== currentAudio) {
            audio.pause();
          }
        });
      }

    audio.forEach((audio) => {
        audio.addEventListener('play', () => {
          pauseAllAudioExcept(audio);
        });
      });

    function createMusicCard(title, artist, url) {
        const musicCard = document.createElement('div');
        musicCard.classList.add('bg-white', 'rounded-lg', 'p-4');
  
        const image = document.createElement('img');
        image.src = 'https://via.placeholder.com/150';
        image.alt = 'Music Cover';
        image.classList.add('w-full', 'mb-4');
        musicCard.appendChild(image);
  
        const titleHeading = document.createElement('h2');
        titleHeading.textContent = title;
        titleHeading.classList.add('text-lg', 'font-bold');
        musicCard.appendChild(titleHeading);
  
        const artistParagraph = document.createElement('p');
        artistParagraph.textContent = artist;
        artistParagraph.classList.add('text-sm', 'text-gray-500');
        musicCard.appendChild(artistParagraph);
  
        const audio = document.createElement('audio');
        audio.src = url;
        audio.classList.add('w-full');
        audio.controls = true;
        musicCard.appendChild(audio);
  
        return musicCard;
    }

    addSongForm.addEventListener('submit', (e) => {
        e.preventDefault();
  
        const songTitleInput = document.getElementById('songTitleInput');
        const artistNameInput = document.getElementById('artistNameInput');
        const songURLInput = document.getElementById('songURLInput');
  
        const songTitle = songTitleInput.value;
        const artistName = artistNameInput.value;
        const songURL = songURLInput.value;

        const data = {
            title: songTitle,
            artist: artistName,
            path: songURL
        };

        const options = {
            method: "POST",
            headers : {'Content-Type':'application/json'},
            body: JSON.stringify(data)
        };

        fetch('/new_songs', options)
        .then((response) => {console.log(response)});
  
        if (songTitle !== '' && artistName !== '' && songURL !== '') {
          const musicCard = createMusicCard(songTitle, artistName, songURL);
          musicContainer.appendChild(musicCard);
  
          // Reset form inputs
          songTitleInput.value = '';
          artistNameInput.value = '';
          songURLInput.value = '';
        }
      });
})

async function ambilData(){
    const songs = await fetch("http://localhost:3000/songs");
    const hasil = await songs.json();
    return hasil;
}
console.log(ambilData());
