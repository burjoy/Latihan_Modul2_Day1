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
    { title: 'Song 1', artist: 'Mardial', cover: "https://i.scdn.co/image/ab67616d0000b273f54f59079948b523fe1b9d09"},
    { title: 'Song 2', artist: 'Mamang Kesbor', cover: "https://i.scdn.co/image/ab67616d0000b273f54f59079948b523fe1b9d09"},
    { title: 'Sbm', artist: 'Mamang Kesbor', cover: "https://i.scdn.co/image/ab67616d0000b273f54f59079948b523fe1b9d09"},
    { title: 'Song 4', artist: 'Mamang Kesbor', cover: "https://i.scdn.co/image/ab67616d0000b273f54f59079948b523fe1b9d09"},
    { title: 'Song 5', artist: 'Mardial', cover: "https://i.scdn.co/image/ab67616d0000b273f54f59079948b523fe1b9d09"},
    { title: 'Song 6', artist: 'Mardial', cover: "https://i.scdn.co/image/ab67616d0000b273f54f59079948b523fe1b9d09"},
    { title: 'Song 7', artist: 'Mardial', cover: "https://i.scdn.co/image/ab67616d0000b273f54f59079948b523fe1b9d09"},
    { title: 'Song 8', artist: 'Mardial', cover: "https://i.scdn.co/image/ab67616d0000b273f54f59079948b523fe1b9d09"}
];

app.get('/songs', (req, res) => {
    res.json(songs);
    console.log(res);
});