const express = require('express');
// const cors = require('cors');
const app = express();
const port = 3000;

app.use(express.static('front_page'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(port, () => {
    console.log(`Server listening to port ${port}`);
});

// app.use(cors());
const songs = [
    { title: 'Song 1', artist: 'Mardial', cover: "https://i.scdn.co/image/ab67616d0000b273f54f59079948b523fe1b9d09", path: "audio/TestSound.mp3"},
    { title: 'Song 2', artist: 'Mamang Kesbor', cover: "https://i.scdn.co/image/ab67616d0000b273f54f59079948b523fe1b9d09", path: "audio/TestSound.mp3"},
    { title: 'Sbm', artist: 'Mamang Kesbor', cover: "https://i.scdn.co/image/ab67616d0000b273f54f59079948b523fe1b9d09", path: "audio/TestSound.mp3"},
    { title: 'Song 4', artist: 'Mamang Kesbor', cover: "https://i.scdn.co/image/ab67616d0000b273f54f59079948b523fe1b9d09", path: "audio/TestSound.mp3"},
    { title: 'Song 5', artist: 'Mardial', cover: "https://i.scdn.co/image/ab67616d0000b273f54f59079948b523fe1b9d09", path: "audio/TestSound.mp3"},
    { title: 'Song 6', artist: 'Mardial', cover: "https://i.scdn.co/image/ab67616d0000b273f54f59079948b523fe1b9d09", path: "audio/TestSound.mp3"},
    { title: 'Song 7', artist: 'Mardial', cover: "https://i.scdn.co/image/ab67616d0000b273f54f59079948b523fe1b9d09", path: "audio/TestSound.mp3"},
    { title: 'Song 8', artist: 'Mardial', cover: "https://i.scdn.co/image/ab67616d0000b273f54f59079948b523fe1b9d09", path: "audio/TestSound.mp3"}
];

app.get('/songs', (req, res) => {
    res.json(songs);
    console.log(res);
});

app.post('/songs', (req, res) => {
    // let body = req.body;
    // let username = req.params.username;
    // let cookie = req.headers.cookie;
    // res.send(`Cookie sent: ${cookie}`);
    console.log(req.params);
    songs.push(req.body);
    // console.log(songs);
    const {title, artist, path} = req.body;
    if(!title){
        res.status(418).send("Lack of title parameter");
    }
    if(!artist){
        res.status(418).send("Lack of artist name parameter");
    }
    if(!path){
        res.status(418).send("Lack of path to song parameter");
    }
    // res.json({
    //     status: "success",
    //     songName: req.body.title,
    //     artistName: req.body.artist,
    //     songId: req.body.id
    // })
    res.json(songs);
})
app.delete('/songs:id', (req, res) => {
    // try{
    //     const id = req.params.id;
    //     // songs.pop(id);
    //     songs.forEach((song) => {
    //         if(song.id == id){
    //             console.log(song);
    //         }
    //     })
    //     res.json(songs);
    // }
    // catch (error){
    //     console.log(error);
    //     res.send(error);
    // }
    const id = req.params.id;
    console.log(id);
    res.send(id);
})
