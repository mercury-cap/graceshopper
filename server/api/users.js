const router = require('express').Router()
const {User, Orders, Products, OrderItems} = require('../db/models')

module.exports = router

router.get('/', isAuthenticated, async (req, res, next) => {
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
  if (req.user && req.user.isAdmin === true) {
    return next()
  }
  res.redirect('/')
}

async function updateCartItems(req, order) {
  let productInOrder = await OrderItems.findOne({
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
    productInOrder = await order.addProduct(req.body.productId, {
      through: {quantity: req.body.quantity}
    })
  }

  return productInOrder
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

    await updateCartItems(req, order)

    const [orderItem] = await order.getProducts({
      where: {id: req.body.productId},
      attributes: ['id', 'name', 'price', 'imageUrl']
    })

    res.status(200).send(orderItem)
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

router.delete('/cart/order/:id', async (req, res, next) => {
  const findQuery = req.user
    ? {userId: req.user.id, status: 'in progress'}
    : {sessionId: req.session.id, status: 'in progress'}

  try {
    const order = await Orders.findOne({
      where: findQuery
    })
    await OrderItems.destroy({
      where: {
        orderId: req.params.id
      }
    })

    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

router.put('/cart/:id', async (req, res, next) => {
  const findQuery = req.user
    ? {userId: req.user.id, status: 'in progress'}
    : {sessionId: req.session.id, status: 'in progress'}

  try {
    const order = await Orders.findOne({
      where: findQuery
    })
    const item = await OrderItems.findOne({
      where: {
        orderId: order.id,
        productId: req.params.id
      }
    })

    await item.update({
      quantity: req.body.quantity
    })

    const [orderItem] = await order.getProducts({
      where: {id: req.params.id},
      attributes: ['id', 'name', 'price', 'imageUrl']
    })

    res.status(200).send(orderItem)
  } catch (err) {
    next(err)
  }
})
