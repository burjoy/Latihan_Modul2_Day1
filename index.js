const express = require('express');
// const cors = require('cors');
const app = express();
// const lagu = require('./data_lagu');
const port = 3000;

app.use(express.static('front_page'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.listen(port, () => {
    console.log(`Server listening to port ${port}`);
});

// app.use(cors());
const songs = [
    { title: 'Song 1', artist: 'Mardial', cover: "https://i.scdn.co/image/ab67616d0000b273f54f59079948b523fe1b9d09", path: "audio/TestSound.mp3", views: 0, id: 50},
    { title: 'Song 2', artist: 'Mamang Kesbor', cover: "https://i.scdn.co/image/ab67616d0000b273f54f59079948b523fe1b9d09", path: "audio/TestSound.mp3", views: 0, id: 60},
    { title: 'Sbm', artist: 'Mamang Kesbor', cover: "https://i.scdn.co/image/ab67616d0000b273f54f59079948b523fe1b9d09", path: "audio/TestSound.mp3", views: 0, id: 70},
    { title: 'Song 4', artist: 'Mamang Kesbor', cover: "https://i.scdn.co/image/ab67616d0000b273f54f59079948b523fe1b9d09", path: "audio/TestSound.mp3", views: 0, id: 80},
    { title: 'Song 5', artist: 'Mardial', cover: "https://i.scdn.co/image/ab67616d0000b273f54f59079948b523fe1b9d09", path: "audio/TestSound.mp3", views: 0, id: 85},
    { title: 'Song 6', artist: 'Mardial', cover: "https://i.scdn.co/image/ab67616d0000b273f54f59079948b523fe1b9d09", path: "audio/TestSound.mp3", views: 0, id: 90},
    { title: 'Song 7', artist: 'Mardial', cover: "https://i.scdn.co/image/ab67616d0000b273f54f59079948b523fe1b9d09", path: "audio/TestSound.mp3", views: 0, id: 100},
    { title: 'Song 8', artist: 'Mardial', cover: "https://i.scdn.co/image/ab67616d0000b273f54f59079948b523fe1b9d09", path: "audio/TestSound.mp3", views: 0, id: 105}
];

app.get('/songs', (req, res) => {
    res.json(songs);
    console.log(res);
});

app.get('/songs/:id', async (req, res) => {
    // res.json(songs);
    songs.forEach((song) => {
        if(song.id == req.params.id){
            res.json(song);
        }
    })
    console.log(res);
});

app.post('/songs', async (req, res) => {
    // let body = req.body;
    // let username = req.params.username;
    // let cookie = req.headers.cookie;
    // res.send(`Cookie sent: ${cookie}`);
    console.log(req.params);
    songs.push(req.body);
    // console.log(songs);
    const {title, artist, cover, path, views, id} = req.body;
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

app.patch('/songs/play/:id', (req, res) => {
    try{
        const id = req.params.id;
        // const {views} = req.body;
        songs.forEach((song) => {
            if(song.id == id){
                song.views += 1;
                res.json(song);
            }
        })
    }
    catch(error){
        res.json(error);
    }
})

app.delete('/songs/:id', (req, res) => {
    try{
        const id = req.params.id;
        // songs.pop(id);
        songs.forEach((song) => {
            if(song.id == id){
                console.log(song);
                songs.indexOf
            }
        })
        res.json(songs);
    }
    catch (error){
        console.log(error);
        res.send(error);
    }
    // const id = req.params.id;
    // console.log(id);
    // res.send(id);
})
