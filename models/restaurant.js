const mongoose = require('mongoose')
const Schema = mongoose.Schema

const restSchema = new Schema({
  id: Number,
  name: String,
  name_en: String,
  category: String,
  image: String,
  location: String,
  phone: String,
  google_map: String,
  rating: Number,
  description: String
})

module.exports = mongoose.model('restList', restSchema)