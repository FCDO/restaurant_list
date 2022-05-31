const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const restList = require('../restaurant')
const User = require('../user')
const restaurant_list = require('./restaurant.json')
const db = require('../../config/mongoose')

const SEED_USER = [
  {
    email: 'user1@example.com',
    password: '12345678',
    restaurant: [1, 2, 3]
  },
  {
    email: 'user2@example.com',
    password: '12345678',
    restaurant: [4, 5, 6]
  }
]


db.once('open', () => {
  return Promise.all(
    Array.from(
      { length: SEED_USER.length },
      (value, i) => {
        return bcrypt
          .genSalt(10)
          .then(salt => bcrypt.hash(SEED_USER[i].password, salt))
          .then(hash => User.create({
            email: SEED_USER[i].email,
            password: hash

          }))
          .then(user => {
            const myRestaurants = restaurant_list.results.filter(element => {
              return SEED_USER[i].restaurant.includes(element.id)
            })
            const userId = user._id

            return Promise.all(
              Array.from(
                myRestaurants,
                (value) => {
                  value.userId = userId
                  return restList.create(value)
                }
              )
            )
          })
          .then(() => {
            console.log('done.')
            process.exit()
          })
      }
    )
  )


})

