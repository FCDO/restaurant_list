const express = require('express')
const router = express.Router()

const restList = require('../../models/restaurant')

router.post('/', (req, res) => {
  const userId = req.user._id
  const { id, name, name_en, category, image, location, phone, google_map, rating, decription } = req.body

  return restList.create({ id, name, name_en, category, image, location, phone, google_map, rating, decription, userId })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))

})

router.get('/search', (req, res) => {
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



//create new restaurant
router.get('/new', (req, res) => {

  return res.render('news')

})

router.get('/:id', (req, res) => {

  const id = req.params.id
  return restList.findById(id)
    .lean()
    .then(restlist => res.render('show', { restaurants: restlist }))
    .catch(error => console.log(error))

})

//go to edit page
router.get("/:id/edit", (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return restList.findOne({ _id, userId })
    .lean()
    .then(restlist => res.render('edit', { restaurants: restlist }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const body = req.body

  return restList.findOne({ _id, userId })
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



router.delete("/:id", (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  return restList.findOne({ _id, userId })
    .then(restlist => restlist.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})






module.exports = router