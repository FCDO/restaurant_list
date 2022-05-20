
const restList = require('../restaurant')
const restaurant_list = require('./restaurant.json')
const db = require('../../config/mongoose')



db.once('open', () => {

  for (let i = 0; i < restaurant_list.results.length; i++) {
    restList.create(restaurant_list.results[i])

  }
  console.log('done')

})

