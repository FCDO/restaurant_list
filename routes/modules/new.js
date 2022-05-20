const express = require('express')
const router = express.Router()

const restList = require('../../models/restaurant')


//create new restaurant
router.get('/', (req, res) => {

  return res.render('news')

})





module.exports = router