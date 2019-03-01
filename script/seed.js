'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')
const {Products} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const products = await Promise.all([
    Products.create({
      name: 'Sriracha Sauce',
      description: 'hot',
      country: 'USA',
      type: 'Hot sauce',
      scoville: 7500,
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/61SEkIa8mGL._SY679_.jpg',
      price: 1099
    }),
    Products.create({
      name: 'Bravado Spice Hot Sauce',
      description: 'hot',
      country: 'USA',
      type: 'Hot sauce',
      scoville: 25000,
      imageUrl:
        'https://ship.ralphs.com/img/Products/500/Bravado-Spice-Co/Bravado-Spice-Co-Hot-Sauce-Crimson-850771005052.jpg',
      price: 600
    }),
    Products.create({
      name: 'Blair’s Ultra Death Sauce',
      description:
        'This frightening sauce is 900 times hotter than a jalapeño.',
      country: 'Somewhere',
      type: 'Super hot sauce',
      scoville: 800000,
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/61VCF68rDFL._SY355_.jpg',
      price: 999
    }),
    Products.create({
      name: 'El Yucateco Chipotle Hot Sauce',
      description:
        'It is ideal to accompany any kind of meals, especially Fast Food as Pizzas, Hot-Dogs, Tacos and Snacks.',
      country: 'Mexico',
      type: 'Hot sauce',
      scoville: 3400,
      imageUrl:
        'https://www.chilliworld.com/content/images/thumbs/0000571_el-yucateco-chipotle-hot-sauce.png',
      price: 349
    }),
    Products.create({
      name: 'Tabasco',
      description:
        'The original and famous bottle sold in more than 185 countries today.',
      country: 'USA',
      type: 'Hot Sauce',
      scoville: 3000,
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/41evj6emeKL.jpg',
      price: 263
    }),
    Products.create({
      name: 'Harissa Le Phare du Cap Bon',
      description:
        'Chilli paste in a Tube! Gives your dishes that authentic North African flavour and comes in very handy packaging for the travellers out there.',
      country: 'Tunisia',
      type: 'Chili paste',
      scoville: 10000,
      imageUrl:
        'https://www.chilliworld.com/content/images/thumbs/0000601_harissa-le-phare-du-cap-bon-70g.png',
      price: 149
    }),
    Products.create({
      name: 'South Devon Chilli Farm Ghost Chilli Sauce',
      description:
        'Handle with care! This sauce is so hot it comes in a 50ml bottle. One drop goes a long way so take it easy!',
      country: 'United Kingdom',
      type: 'Chili paste',
      scoville: 400000,
      imageUrl:
        'https://www.chilliworld.com/content/images/thumbs/0000829_south-devon-chilli-farm-ghost-chilli-sauce.jpeg',
      price: 549
    }),
    Products.create({
      name: 'African Rhino Peri-Peri Mild Sauce',
      description:
        'This will run you down and stick its horn in ya like the wild beast Rhino.',
      country: 'USA',
      type: 'Hot sauce',
      scoville: 5000,
      imageUrl:
        'https://cdn11.bigcommerce.com/s-cb3kf/images/stencil/900x1800/products/781/2352/Rhino_mild__36385.1513129544.png?c=2',
      price: 800
    }),
    Products.create({
      name: 'Amazon Chipotle Hot Sauce',
      description: 'Amazing hot sauce',
      country: 'Colombia',
      type: 'Hot sauce',
      scoville: 25000,
      imageUrl:
        'https://images-na.ssl-images-amazon.com/images/I/31tT904TinL._SX355_.jpg',
      price: 449
    }),
    Products.create({
      name: 'Zulu Zulu Xtra Hot Hot Sauce',
      description: 'This Xtra Hot sauce is made from all natural ingredients',
      country: 'South Africa',
      type: 'Hot sauce',
      scoville: 125000,
      imageUrl:
        'https://cdn11.bigcommerce.com/s-qqb56hyrha/images/stencil/500x659/products/2462/5335/1562__10704.1516006923.jpg',
      price: 695
    })
  ])

  const users = await Promise.all([
    User.create({
      firstName: 'Grace',
      lastName: 'Hopper',
      email: 'gracie@email.com',
      password: '123',
      shippingAddress: '1 Hot Sauce Way',
      shippingCity: 'New York',
      shippingState: 'New York',
      shippingZip: '11211',
      billingAddress: '1 Hot Sauce Way',
      billingState: 'New York',
      billingCity: 'New York',
      billingZip: '11211'
    }),

    User.create({
      firstName: 'Bob',
      lastName: 'Hatter',
      email: 'bobby@email.com',
      password: '123',
      shippingAddress: '23 Spicey Court',
      shippingCity: 'Orlando',
      shippingState: 'Florida',
      shippingZip: '11211',
      billingAddress: '50 Pepper Rd',
      billingState: 'Los Angeles',
      billingCity: 'California',
      billingZip: '22334'
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} products`)
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
