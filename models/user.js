const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const userSchema = mongoose.Schema({
  name: {type: String},
  email: {type: String},
  username: {type: String},
  password: {type: String},
})

const User = mongoose.model('User', userSchema)

module.exports = User;

