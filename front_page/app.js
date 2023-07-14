
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

        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add("flex", "justify-between", "mt-4");
        const button_update = document.createElement('button');
        const button_remove = document.createElement('button');
        button_update.classList.add("bg-blue-500", "text-white", "rounded-full", "px-4", "py-2", "mr-2", "updateBtn");
        button_remove.classList.add("bg-red-500", "text-white", "rounded-full", "px-4", "py-2", "deleteBtn");
        button_update.innerText = "Update";
        button_remove.innerText = "Delete";
        buttonContainer.appendChild(button_update);
        buttonContainer.appendChild(button_remove);
        musicCard.appendChild(buttonContainer);
  
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
        let song_id = Math.floor(Math.random()*(999-100+1)+100);

        // fetch('/new_songs', options)
        // .then((response) => {console.log(response)});

        postData(songTitle, artistName, songURL, song_id)
        .then(response => {
          console.log(response)
          if (songTitle !== '' && artistName !== '' && songURL !== '') {
            const musicCard = createMusicCard(songTitle, artistName, songURL);
            musicContainer.appendChild(musicCard);
    
            // Reset form inputs
            songTitleInput.value = '';
            artistNameInput.value = '';
            songURLInput.value = '';
          }
        });
      });

      function createUpdateForm(title, artist, url) {
        const updateForm = document.createElement('form');
        // updateForm.classList.add('flex');
  
        const titleInput = document.createElement('input');
        titleInput.type = 'text';
        titleInput.value = title;
        titleInput.classList.add('mr-2', 'px-4', 'py-2', 'border', 'border-gray-300');
        updateForm.appendChild(titleInput);
  
        const artistInput = document.createElement('input');
        artistInput.type = 'text';
        artistInput.value = artist;
        artistInput.classList.add('mr-2', 'px-4', 'py-2', 'border', 'border-gray-300');
        updateForm.appendChild(artistInput);
  
        const urlInput = document.createElement('input');
        urlInput.type = 'text';
        urlInput.value = url;
        urlInput.classList.add('mr-2', 'px-4', 'py-2', 'border', 'border-gray-300');
        updateForm.appendChild(urlInput);
  
        const updateButton = document.createElement('button');
        updateButton.type = 'submit';
        updateButton.textContent = 'Update';
        updateButton.classList.add('bg-blue-500', 'text-white', 'rounded-full', 'px-4', 'py-2');
        updateForm.appendChild(updateButton);

        updateForm.addEventListener('submit', (e) => {
          e.preventDefault();
    
          const updatedTitle = titleInput.value.trim();
          const updatedArtist = artistInput.value.trim();
          const updatedURL = urlInput.value.trim();
    
          if (updatedTitle !== '' && updatedArtist !== '' && updatedURL !== '') {
            const updatedMusicCard = createMusicCard(updatedTitle, updatedArtist, updatedURL);
            updateForm.closest('.bg-white').replaceWith(updatedMusicCard);
          }
        });
        return updateForm;
    }

    musicContainer.addEventListener('click', (e) => {
      const target = e.target;

      if (target.classList.contains('deleteBtn')) {
        const musicCard = target.closest('.bg-white');
        musicCard.remove();
      } else if (target.classList.contains('updateBtn')) {
        const musicCard = target.closest('.bg-white');
        const title = musicCard.querySelector('h2').textContent;
        const artist = musicCard.querySelector('p').textContent;
        const audioSrc = musicCard.querySelector('audio').src;

        const updateForm = createUpdateForm(title, artist, audioSrc);
        musicCard.innerHTML = '';
        musicCard.appendChild(updateForm);
      }
    });
})

async function ambilData(){
    const songs = await fetch("http://localhost:3000/songs");
    const hasil = await songs.json();
    return hasil;
}

async function postData(songTitle, artistName, songURL, song_id){
  const data = {
    title: songTitle,
    artist: artistName,
    path: songURL, 
    id: song_id
  };

  const options = {
    method: "POST",
    headers : {'Content-Type':'application/json'},
    body: JSON.stringify(data)
  };

  const newSong = await fetch('http://localhost:3000/songs', options);
  const json = newSong.json();
  return json;
}
console.log(ambilData());
