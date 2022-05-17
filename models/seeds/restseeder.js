const mongoose = require('mongoose')
const restList = require('../restaurant')
const restaurant_list = require('./restaurant.json')

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection
console.log(restaurant_list.results.length)
db.on('error', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected')
  for (let i = 0; i < restaurant_list.results.length; i++) {
    restList.create(restaurant_list.results[i])
    console.log(i)
  }

})

