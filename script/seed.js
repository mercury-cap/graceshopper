'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      name: 'Grace',
      email: 'gracie@email.com',
      password: '123',
      shippingAddress: '1 Hot Sauce Way',
      shippingCity: 'New York',
      shippingState: 'New York',
      shippingZip: '11211',
      billingAddress: '1 Hot Sauce Way',
      billingCity: 'New York',
      billingZip: '11211'
    }),

    User.create({
      name: 'Bob',
      email: 'bobby@email.com',
      password: '123',
      shippingAddress: '23 Spicey Court',
      shippingCity: 'Orlando',
      shippingState: 'Florida',
      shippingZip: '11211',
      billingAddress: '1 Hot Sauce Way',
      billingCity: 'New York',
      billingZip: '32789'
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
