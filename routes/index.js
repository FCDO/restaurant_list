const express = require('express')
const router = express.Router()
const restaurant = require('./modules/restaurant')
const { authenticator } = require('../middleware/auth')
// 引入 home 模組程式碼
const home = require('./modules/home')

const users = require('./modules/users')

router.use('/users', users)
router.use('/restaurants', authenticator, restaurant)
router.use('/', authenticator, home)







module.exports = router