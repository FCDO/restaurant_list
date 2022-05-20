const express = require('express')
const router = express.Router()
const restaurant = require('./modules/restaurant')
const search = require('./modules/search')
const news = require('./modules/new')
// 引入 home 模組程式碼
const home = require('./modules/home')

router.use('/', home)

router.use('/restaurants', restaurant)

router.use('/search', search)

router.use('/new', news)



module.exports = router