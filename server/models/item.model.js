const mongoose = require('mongoose')
const Schema = mongoose.Schema

let itemSchema = new Schema({
  name: String,
  price: Number,
  imgUrl: String,
  category: String,
  stock: Number,
},{
  timestamps: true
})

let Item = mongoose.model('Item', itemSchema)

module.exports = Item
