const router = require('express').Router()
const {User, Orders} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.put('/cart', async (req, res, next) => {
  // console.log('req.user.id: ', req.user.id)
  console.log('req.session.id: ', req.session.id)
  console.log('req.user: ', req.user.id)
  const userId = req.user ? req.user.id : null

  const orderInfo = {status: 'in progress', userId: userId}

  try {
    const [order, wasCreated] = await Orders.findOrCreate({
      where: {sessionId: req.session.id},
      defaults: orderInfo
    })
    if (!wasCreated) {
      await order.update({userId: userId})
    }

    // work in logic for adding multiple instance of same product
    // to order, because currently if you add 5 srirachas, then another
    // 10, it just replaces the 5 with 10
    await order.addProduct(req.body.productId, {
      through: {quantity: req.body.quantity}
    })
    res.status(200).send(order)
  } catch (err) {
    next(err)
  }
})

router.get('/cart', (req, res, next) => {
  req.user.cart
    ? res.send(req.user.cart)
    : res.status(404).send('No items in cart')
})
