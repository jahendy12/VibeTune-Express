const mongoose = require('mongoose')

const liveroomSchema = mongoose.Schema({
  name: {type: String, required: true},
  genre: {type: String, required: true},
// spotifyProfile: ,  
  likes: {type: Number, default: 0}, 
  dislikes: {type: Number, default: 0}
})

module.exports = mongoose.model('Liveroom', liveroomSchema)