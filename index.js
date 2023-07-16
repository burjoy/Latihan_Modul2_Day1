const express = require('express');
const cors = require('cors');
const app = express();
const router = express.Router();
const list_lagu = require('./daftar_lagu.json');
const fs = require('fs');
// const mongoose = require('mongoose');
// const data_lagu = require('./models/data_lagu');
const port = 3000;

// mongoose.connect('mongodb://127.0.0.1/lagu_db')
// .then((response) => {
//     console.log("Berhasil konek ke database");
// })
// .catch((err) => {
//     console.log(`Error: ${err}`);
// })

app.use(express.static('front_page'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors());

app.get('/songs', (req, res) => {
    res.json(list_lagu);
    // console.log(res);
});

app.get('/songs/:id', async (req, res) => {
    // res.json(songs);
    list_lagu.forEach((song) => {
        if(song.id == req.params.id){
            res.json(song);
        }
    })
    // console.log(res);
});

app.post('/songs', async (req, res) => {
    // let body = req.body;
    // let username = req.params.username;
    // let cookie = req.headers.cookie;
    // res.send(`Cookie sent: ${cookie}`);
    // console.log(req.params);
    // list_lagu.push(req.body);
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
    const data = list_lagu;
    data.push(req.body);
    // res.json(list_lagu);
    fs.writeFile('./daftar_lagu.json', JSON.stringify(data, null, 2), (err) => {
        if (err) {
            console.error(err);
            res.status(500).send("Failed to update list_lagu");
        } else {
            res.json(list_lagu);
            console.log(data);
        }
    });
})

app.patch('/songs/play/:id', (req, res) => {
    try {
      const id = req.params.id;
      let updatedSong = null;
  
      // Find the song with the provided ID
      list_lagu.forEach((song) => {
        if (song.id == id) {
          song.views += 1;
          updatedSong = song;
        }
      });

      if (updatedSong) {
        fs.writeFile('./daftar_lagu.json', JSON.stringify(list_lagu, null, 2), (err) => {
          if (err) {
            console.error(err);
            res.status(500).send("Failed to update views data");
          } else {
            res.json(updatedSong);
          }
        });
      } else {
        res.status(404).send("Song not found");
      }
    } catch (error) {
      res.json(error);
    }
  });
  

app.delete('/songs/delete/:id', (req, res) => {
    try{
        const id = req.params.id;
        // songs.pop(id);
        list_lagu.forEach((song) => {
            if(song.id == id){
                console.log(list_lagu.indexOf(song));
                list_lagu.splice(list_lagu.indexOf(song), 1);
            }
        })
        fs.writeFile('./daftar_lagu.json', JSON.stringify(list_lagu, null, 2), (err) => {
          if (err) {
            console.error(err);
            res.status(500).send("Failed to remove data");
          } else {
            res.json(list_lagu);
          }
        });
    }
    catch (error){
        console.log(error);
        res.send(error);
    }
})

app.get('/songs/sort/AscendByTitle',(req, res) => {
  try {
    let sorted = list_lagu.sort((a,b) => {
      let fa = a.title.toLowerCase();
      let fb = b.title.toLowerCase();
      if(fa > fb){
         return 1;
      }
      else{
          return -1
      }
  });
    res.json(sorted);
  } 
  catch (error) {
    res.send(error);
  }
})

app.get('/songs/sort/DescendByTitle',(req, res) => {
  try {
    let sorted = list_lagu.sort((a,b) => {
      let fa = a.title.toLowerCase();
      let fb = b.title.toLowerCase();
      if(fa < fb){
         return 1;
      }
      else{
          return -1
      }
  });
    res.json(sorted);
  } 
  catch (error) {
    res.send(error);
  }
})

app.listen(port, () => {
    console.log(`Server listening to port ${port}`);
});
