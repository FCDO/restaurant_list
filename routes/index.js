const express = require('express')
const router = express.Router()
const restaurant = require('./modules/restaurant')

// 引入 home 模組程式碼
const home = require('./modules/home')

const users = require('./modules/users')

router.use('/users', users)
router.use('/restaurants', restaurant)
router.use('/', home)







module.exports = router