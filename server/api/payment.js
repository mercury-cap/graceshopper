const router = require('express').Router()
const keyPublishable = process.env.PUBLISHABLE_KEY
const keySecret = process.env.SECRET_KEY
const stripe = require('stripe')(keySecret)
module.exports = router

router.get('/', (req, res, next) => {
  try {
    res.render('index.pug', keyPublishable)
  } catch (error) {
    next(error)
  }
})

router.post('/charge', async (req, res, next) => {
  let amount = 500

  try {
    const customer = await stripe.customers.create({
      email: req.body.stripeEmail,
      source: req.body.stripeToken
    })

    await stripe.charges.create({
      amount,
      description: 'Sample Charge',
      currency: 'usd',
      customer: customer.id
    })

    res.render('charge.pug')
  } catch (error) {
    next(error)
  }
})
