const express = require('express')
const router = express.Router()

const restList = require('../../models/restaurant')


router.get('/', (req, res) => {
  const userId = req.user._id
  restList.find({ userId })
    .lean()
    .then(restlist => res.render('index', { restaurants: restlist }))
    .catch(error => console.log(error))

})

module.exports = router