//require package used in the project
const bodyparser = require('body-parser')
const express = require('express')
const app = express()
const port = 3000
const restList = require('./models/restaurant')

// 載入 method-override
const methodOverride = require('method-override')
// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))

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
  const id = req.params.id
  return restList.findById(id)
    .lean()
    .then(restlist => res.render('show', { restaurants: restlist }))
    .catch(error => console.log(error))

})

//go to edit page
app.get("/restaurants/:id/edit", (req, res) => {
  const id = req.params.id
  return restList.findById(id)
    .lean()
    .then(restlist => res.render('edit', { restaurants: restlist }))
    .catch(error => console.log(error))
})

app.put('/restaurants/:id', (req, res) => {
  const id = req.params.id
  const body = req.body

  return restList.findById(id)
    .then(restlist => {
      restlist.name = body.name
      restlist.category = body.category
      restlist.location = body.location
      restlist.phone = body.phone
      return restlist.save()
    })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

//create new restaurant
app.get('/new', (req, res) => {

  return res.render('news')

})

app.post('/restaurants', (req, res) => {
  const body = req.body
  return restList.create(body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))

})

app.delete("/restaurants/:id", (req, res) => {
  const id = req.params.id
  return restList.findById(id)
    .then(restlist => restlist.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


app.get('/search', (req, res) => {
  const keyword = req.query.keyword.trim().toLowerCase()
  const sort = req.query.sort
  const sortRule = {
    A_to_Z: { name: 'asc' },
    Z_to_A: { name: 'desc' },
    類別: { category: 'asc' },
    地區: { location: 'asc' }

  }
  return restList.find()
    .lean()
    .sort(sortRule[sort])
    .then(restlist => {
      const filterList = restlist.filter(rest => {
        const rest_keyword = rest.name.trim().toLowerCase()
        return rest_keyword.includes(keyword)
      })
      res.render('index', { restaurants: filterList })
    })
    .catch(err => console.log(err))

})
//start and listen on the Express server

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})