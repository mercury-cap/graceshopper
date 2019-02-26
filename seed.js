const {db} = require('./server/db')
const {green, red} = require('chalk')

const Products = require('./server/db/models/products')

const seed = async () => {
  await db.sync({force: true})

  const [SrirachaSauce, BravadoSpiceHotSauce] = await Promise.all([
    Products.create({
      name: 'Sriracha Sauce',
      description: 'hot',
      country: 'USA',
      type: 'sauce',
      scoville: 1
    }),
    Products.create({
      name: 'Bravado Spice Hot Sauce',
      description: 'hot',
      country: 'Somewhere',
      type: 'dip',
      scoville: 1
    })
  ])

  console.log(green('Seeding success!'))
  db.close()
}

seed().catch(err => {
  console.error(red('Oh noes! Something went wrong!'))
  console.error(err)
  db.close()
})
