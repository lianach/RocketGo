/* eslint-disable no-console */
const db = require('./server/db')
const {
  User,

} = require('./server/db/models')

const users = [
  {
    email: 'liana@email.com',
    password: '123'
  }
]

const seed = () =>
  Promise.all(users.map(user => User.create(user)))

const main = () => {
  console.log('Syncing db...')
  db
    .sync({ force: true })
    .then(() => {
      console.log('Seeding databse...')
      return seed()
    })
    .catch(err => {
      console.log('Error while seeding')
      console.log(err.stack)
    })
    .then(() => {
      db.close()
      return null
    })
}
main()
