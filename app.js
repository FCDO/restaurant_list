//require package used in the project
const bodyparser = require('body-parser')
const express = require('express')
const app = express()
const port = 3000
const restaurant_list = require('./restaurant.json')

const mongoose = require('mongoose') // 載入 mongoose
mongoose.connect(process.env.MONGODB_URI) // 設定連線到 mongoDB

// 取得資料庫連線狀態
const db = mongoose.connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

app.use(bodyparser.urlencoded({ extended: true }))
//require express-handlebars here
const exphbs = require('express-handlebars')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))
//route setting
app.get('/', (req, res) => {

  res.render('index', { restaurants: restaurant_list.results })
})

app.get('/restaurants/:id', (req, res) => {
  console.log(req.params.id)
  const restaurant = restaurant_list.results.find((item) => {
    return Number(req.params.id) === (item.id)
  })
  res.render('show', { restaurants: restaurant })
})

app.get('/search', (req, res) => {
  console.log(req.query)
  const keyword = req.query.keyword
  const target_restaurant = restaurant_list.results.filter((item) => {
    return item.name.toLowerCase().includes(req.query.keyword.toLowerCase())
  })
  res.render('index', { restaurants: target_restaurant, keyword: keyword })
})
//start and listen on the Express server

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})