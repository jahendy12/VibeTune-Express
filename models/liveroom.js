const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const liveroomSchema = mongoose.Schema({
    name: {type: String},
    genre: {type: String}, 
    description: {type: String}
})

const Liveroom = mongoose.model('Liveroom', liveroomSchema)

module.exports = Liveroom;