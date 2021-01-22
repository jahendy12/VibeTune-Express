const express = require('express');
const cors = require ('cors');
const mongoose = require('mongoose');

// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     next();
//   });

require('dotenv').config();

const app = express();
const port = 5000; 

app.use(cors());
app.use(express.json());

// res.header("Access-Control-Allow-Origin", "*");

// app.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', '*');
//     next();
//   });

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true});
//useCreateIndex: true
const connection = mongoose.connection; 
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const usersRouter = require('./controllers/users')
const playlistsRouter = require('./controllers/playlists')
const liveroomsRouter = require('./controllers/liverooms')

app.use('/users', usersRouter);
app.use('/playlists', playlistsRouter);
app.use('/liverooms', liveroomsRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});