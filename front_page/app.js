const song_titles = document.querySelectorAll(".music_title");
const song_artists = document.querySelectorAll(".music_artist");
const cards = document.querySelectorAll(".music_card");
const albums = document.querySelectorAll(".music_album");
const randos = Math.random()*10;
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
                console.log(json[i].title);
            }
            console.log(json);
        })
    }
})

async function ambilData(){
    const songs = await fetch("http://localhost:3000/songs");
    const hasil = await songs.json();
    return hasil;
}
console.log(ambilData());