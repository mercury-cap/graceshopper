const router = require('express').Router()
const {User, Orders} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: [
        'firstName',
        'lastName',
        'id',
        'email',
        'shippingAddress',
        'shippingCity',
        'shippingState',
        'shippingZip'
      ]
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.put('/cart', async (req, res, next) => {
  const orderInfo = {status: 'in progress'}
  const [newOrder] = await Orders.findOrCreate({
    where: {userId: req.user.id},
    defaults: orderInfo
  })
  await newOrder.addProduct(req.body.productId)
  res.status(200).send(newOrder)
})

router.get('/cart', (req, res, next) => {
  req.user.cart
    ? res.send(req.user.cart)
    : res.status(404).send('No items in cart')
})
