const mongoose = require('mongoose')
const Schema = mongoose.Schema

let userSchema = new Schema({
  name: String,
  address: String,
  phone: String,
  gender: String,
  email: String,
  password: String,
  role: String
},{
  timestamps: true
})

let User = mongoose.model('User', userSchema)

module.exports = User
