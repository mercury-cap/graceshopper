const router = require('express').Router()
const {User, Orders, Products, OrderItems} = require('../db/models')
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
  const findQuery = req.user
    ? {userId: req.user.id, status: 'in progress'}
    : {sessionId: req.session.id, status: 'in progress'}
  const orderInfo = {status: 'in progress', userId: userId}

  try {
    const [order, wasCreated] = await Orders.findOrCreate({
      where: findQuery,
      defaults: orderInfo
    })

    if (!wasCreated) {
      await order.update({userId: userId})
    }

    const productInOrder = await OrderItems.findOne({
      where: {
        orderId: order.id,
        productId: req.body.productId
      }
    })

    if (productInOrder) {
      await productInOrder.update({
        quantity: productInOrder.quantity + req.body.quantity
      })
    } else {
      await order.addProduct(req.body.productId, {
        through: {quantity: req.body.quantity}
      })
    }

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
      where: findQuery,
      include: [
        {
          model: Products,
          attributes: ['id', 'name', 'price', 'imageUrl']
        }
      ]
    })
    res.json(cart.products)
  } catch (error) {
    next(error)
  }
})
