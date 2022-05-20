const express = require('express')
const router = express.Router()
const restaurant = require('./modules/restaurant')

// 引入 home 模組程式碼
const home = require('./modules/home')

router.use('/', home)

router.use('/restaurants', restaurant)





module.exports = router