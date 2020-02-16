const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const playlistSchema = mongoose.Schema({
  name: String,
  genre: String, 
  description: String
})

const Playlist = mongoose.model('Playlist', playlistSchema)

module.exports = Playlist;