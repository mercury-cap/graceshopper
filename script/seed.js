'use strict'

const db = require('../server/db')
const {User} = require('../server/db/models')
const {Products} = require('../server/db/models')

const productsToSeed = [
  {
    name: 'Sriracha Sauce',
    description:
      'Huy Fong\'s Sriracha sauce, also simply referred to as Sriracha, is based on David Tran\'s recipe for the Sriracha chili sauce, a dipping sauce that originated in Thailand. This sauce is produced by Huy Fong Foods, a California manufacturer. Created in 1980 by ethnic Chinese immigrant from Vietnam David Tran. It is a brand of Sriracha sauce often also known as "rooster sauce" because of the rooster prominently featured on its label. Some cookbooks include recipes using it as their main condiment.',
    country: 'USA',
    type: 'Hot sauce',
    scoville: 7500,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/61SEkIa8mGL._SY679_.jpg',
    price: 1099
  },
  {
    name: 'Pain 100%',
    description:
      'Will burn you up. The higher the %, the more pain and less flavor. But to a true Chile head, the more pain, the better the sauce. Taste the Pain.',
    country: 'USA',
    type: 'Hot sauce',
    scoville: 250000,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/814%2BDUjMImL._SY679_.jpg',
    price: 695
  },
  {
    name: 'Da Bomb Beyond Insanity Hot Sauce',
    description:
      'The ultimate in hot. This sauce is way past insanity. Rated at 135,600 Scoville units.',
    country: 'USA',
    type: 'Hot sauce',
    scoville: 135600,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/817urpJuMbL._SY679_.jpg',
    price: 1085
  },
  {
    name: 'El Yucateco Chipotle Hot Sauce',
    description:
      'It is ideal to accompany any kind of meals, especially Fast Food as Pizzas, Hot-Dogs, Tacos and Snacks.',
    country: 'Mexico',
    type: 'Hot sauce',
    scoville: 3400,
    imageUrl:
      'https://www.chilliworld.com/content/images/thumbs/0000571_el-yucateco-chipotle-hot-sauce.png',
    price: 349
  },
  {
    name: 'Tabasco',
    description:
      'The original and famous bottle sold in more than 185 countries today.',
    country: 'USA',
    type: 'Hot Sauce',
    scoville: 3000,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/41evj6emeKL.jpg',
    price: 263
  },
  {
    name: 'Harissa Le Phare du Cap Bon',
    description:
      'Chilli paste in a Tube! Gives your dishes that authentic North African flavour and comes in very handy packaging for the travellers out there.',
    country: 'Tunisia',
    type: 'Paste',
    scoville: 10000,
    imageUrl:
      'https://www.chilliworld.com/content/images/thumbs/0000601_harissa-le-phare-du-cap-bon-70g.png',
    price: 149
  },
  {
    name: 'South Devon Chilli Farm Ghost Chilli Sauce',
    description:
      'Handle with care! This sauce is so hot it comes in a 50ml bottle. One drop goes a long way so take it easy!',
    country: 'United Kingdom',
    type: 'Paste',
    scoville: 400000,
    imageUrl:
      'https://www.chilliworld.com/content/images/thumbs/0000829_south-devon-chilli-farm-ghost-chilli-sauce.jpeg',
    price: 549
  },
  {
    name: 'African Rhino Peri-Peri Mild Sauce',
    description:
      'This will run you down and stick its horn in ya like the wild beast Rhino.',
    country: 'USA',
    type: 'Hot sauce',
    scoville: 5000,
    imageUrl:
      'https://cdn11.bigcommerce.com/s-cb3kf/images/stencil/900x1800/products/781/2352/Rhino_mild__36385.1513129544.png?c=2',
    price: 800
  },
  {
    name: 'Lao Gan Ma Spicy Chili Crisp',
    description:
      'Often a thick paste and used as a dipping sauce or for stir frying. Chili oils, pickled chilies, garlic, sesame seeds and soybeans are common ingredients.',
    country: 'China',
    type: 'Paste',
    scoville: 25000,
    imageUrl:
      'https://iglobalfood.com/m17/media/catalog/product/cache/1/image/800x800/9df78eab33525d08d6e5fb8d27136e95/l/g/lgm_hot_sauce_crisjpy_jar_210g.jpg',
    price: 750
  },
  {
    name: 'Zulu Zulu Xtra Hot Hot Sauce',
    description: 'This Xtra Hot sauce is made from all natural ingredients',
    country: 'South Africa',
    type: 'Hot sauce',
    scoville: 125000,
    imageUrl:
      'https://cdn11.bigcommerce.com/s-qqb56hyrha/images/stencil/500x659/products/2462/5335/1562__10704.1516006923.jpg',
    price: 695
  },
  {
    name: 'Valentina Hot Sauce',
    description:
      'Valentina Hot Sauce is made by a family owned business in Guadalajara, Jalisco. It is made from puya chiles, vinegar, water, and spices. The flavor is tangy, spicy, and slightly vinegary. It is available in two varieties (yellow label and black label). The yellow label has medium heat, and the black label is hot. It’s slightly thicker than your standard hot sauce. Valentina is really good on pizza, chips, and popcorn. In fact, the movie theaters in Mexico always have a dispenser full of Valentina so you can pour it on your popcorn!',
    country: 'Mexico',
    type: 'Hot sauce',
    scoville: 10000,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/81ejas6ONCL._SL1500_.jpg',
    price: 350
  },
  {
    name: 'Mae Pranom Chili Pepper Powder',
    description:
      'This crushed bird chili flakky powder have a medium heat without being overwhelming. They are often used as a table condiment, adding a pleasant heat and attractive appearance to any dish. It is an excellent choice anywhere hot and spicy taste are called for.',
    country: 'Thailand',
    type: 'Powder',
    scoville: 50000,
    imageUrl:
      'https://www.driverpalx.com/media/catalog/product/picture/TG/TGA0226/TGA0226_02.jpg',
    price: 869
  },
  {
    name: 'Chung Jung One Gochujang',
    description:
      "Chung Jung One's Gochujang Korean gochujang is the next generation of the traditional fermented Korean hot chili paste and will deliver a sweet, tart, umami tang to your taste buds.",
    country: 'Korea',
    type: 'Paste',
    scoville: 8000,
    imageUrl:
      'https://images-na.ssl-images-amazon.com/images/I/81HXJdE7PGL._SX522_.jpg',
    price: 995
  }
]

const usersToSeed = [
  {
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
  },
  {
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
  }
]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const products = await Promise.all(
    productsToSeed.map(product => Products.create(product))
  )

  const users = await Promise.all(usersToSeed.map(user => User.create(user)))

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
