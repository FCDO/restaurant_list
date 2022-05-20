const express = require('express')
const router = express.Router()

const restList = require('../../models/restaurant')

router.get('/', (req, res) => {
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

module.exports = router