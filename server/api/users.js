const router = require('express').Router()
const {User, Orders, Products} = require('../db/models')
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
  const userId = req.user ? req.user.id : null

  const orderInfo = {status: 'in progress', userId: userId}

  try {
    const [order, wasCreated] = await Orders.findOrCreate({
      // change the where to userId if it is a logged in user using a different computer
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

router.get('/cart', async (req, res, next) => {
  const findQuery = req.user
    ? {userId: req.user.id}
    : {sessionId: req.session.id}

  try {
    const cart = await Orders.findOne({
      // change the where to userId if it is a logged in user using a different computer
      where: findQuery,
      include: [
        {
          model: Products,
          attributes: ['id', 'name', 'price', 'imageUrl']
        }
      ]
    })
    // const items = await cart.getProducts()
    res.json(cart.products)
  } catch (error) {
    next(error)
  }
})
