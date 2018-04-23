const mongoose = require('mongoose')
const Schema = mongoose.Schema

let chartSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref:'User' },
  item: { type: Schema.Types.ObjectId, ref:'Item'}
},{
  timestamps: true
})

let Chart = mongoose.model('Chart', chartSchema)

module.exports = Chart
