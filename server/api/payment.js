const router = require('express').Router()
const SECRET_KEY = 'sk_test_fAHI4k5tSM1hlR7CWwJi5CKt'
const stripe = require('stripe')(SECRET_KEY)
module.exports = router

router.post('/', (req, res, next) => {
  stripe.charges.create(req.body, (stripeErr, stripeRes) => {
    stripeErr
      ? res.status(500).send({error: stripeErr})
      : res.status(200).send({success: stripeRes})
  })
})
