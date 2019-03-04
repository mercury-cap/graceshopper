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

function isAuthenticated(req, res, next) {
  if (req.user) {
    return next()
  }
  res.redirect('/')
}

async function updateCartItems(req, order) {
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
}

router.put('/cart', async (req, res, next) => {
  const userId = req.user ? req.user.id : null

  const orderDefaults = {
    status: 'in progress',
    sessionId: req.session.id,
    userId
  }

  try {
    let order = await Orders.findOne({
      where: {sessionId: req.session.id, status: 'in progress'}
    })

    if (!order && req.user) {
      order = await Orders.findOne({where: {userId, status: 'in progress'}})
    }
    if (!order) {
      order = await Orders.create(orderDefaults)
    }
    updateCartItems(req, order)
    res.status(200).send(order)
  } catch (err) {
    next(err)
  }
})

router.get('/cart', async (req, res, next) => {
  try {
    let cart = await Orders.findOne({
      where: {sessionId: req.session.id, status: 'in progress'},
      include: [
        {
          model: Products,
          attributes: ['id', 'name', 'price', 'imageUrl']
        }
      ]
    })

    if (cart && req.user) {
      await cart.update({userId: req.user.id})
    } else if (!cart && req.user) {
      cart = await Orders.findOne({
        where: {userId: req.user.id, status: 'in progress'},
        include: [
          {
            model: Products,
            attributes: ['id', 'name', 'price', 'imageUrl']
          }
        ]
      })
    }

    res.json(cart)
  } catch (error) {
    next(error)
  }
})

router.delete('/cart/:id', async (req, res, next) => {
  const findQuery = req.user
    ? {userId: req.user.id, status: 'in progress'}
    : {sessionId: req.session.id, status: 'in progress'}

  try {
    const order = await Orders.findOne({
      where: findQuery
    })
    await OrderItems.destroy({
      where: {
        orderId: order.id,
        productId: req.params.id
      }
    })

    res.status(204).end()
  } catch (err) {
    next(err)
  }
})
