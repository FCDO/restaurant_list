//require package used in the project
const bodyparser = require('body-parser')
const express = require('express')
const app = express()
const port = 3000
const restList = require('./models/restaurant')

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
  restList.find()
    .lean()
    .then(restlist => res.render('index', { restaurants: restlist }))
    .catch(error => console.log(error))

})

app.get('/restaurants/:id', (req, res) => {
  console.log(req.params.id)
  const id = req.params.id
  return restList.findById(id)
    .lean()
    .then(restlist => res.render('show', { restaurants: restlist }))
    .catch(error => console.log(error))

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