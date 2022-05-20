//require package used in the project
const bodyparser = require('body-parser')
const express = require('express')
const app = express()
const port = 3000
const restList = require('./models/restaurant')
const routes = require('./routes/index')
require('./config/mongoose')


// 載入 method-override
const methodOverride = require('method-override')
// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))



app.use(bodyparser.urlencoded({ extended: true }))
//require express-handlebars here
const exphbs = require('express-handlebars')

app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// setting static files
app.use(express.static('public'))
//route setting

app.use(routes)
//start and listen on the Express server

app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})