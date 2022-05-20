const express = require('express')
const router = express.Router()

const restList = require('../../models/restaurant')

router.get('/:id', (req, res) => {
  const id = req.params.id
  return restList.findById(id)
    .lean()
    .then(restlist => res.render('show', { restaurants: restlist }))
    .catch(error => console.log(error))

})

//go to edit page
router.get("/:id/edit", (req, res) => {
  const id = req.params.id
  return restList.findById(id)
    .lean()
    .then(restlist => res.render('edit', { restaurants: restlist }))
    .catch(error => console.log(error))
})

router.put('/:id', (req, res) => {
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

router.post('/', (req, res) => {
  const body = req.body
  return restList.create(body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))

})

router.delete("/:id", (req, res) => {
  const id = req.params.id
  return restList.findById(id)
    .then(restlist => restlist.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})






module.exports = router