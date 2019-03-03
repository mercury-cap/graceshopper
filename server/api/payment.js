const router = require('express').Router()
const {User, Orders, Products, OrderItems} = require('../db/models')
const SECRET_KEY = process.env.SECRET_KEY
const stripe = require('stripe')(SECRET_KEY)
module.exports = router

router.post('/', (req, res, next) => {
  stripe.charges.create(req.body, (stripeErr, stripeRes) => {
    stripeErr
      ? res.status(500).send({error: stripeErr})
      : res.status(200).send({success: stripeRes})
  })
})

router.delete('/', (req, res, next) => {
  console.log('INSIDE DELETE /api/payment')
  // Orders.findOne({where: })
  res.sendStatus(200)
})
