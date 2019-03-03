import React, {Component} from 'react'
import StripeCheckout from 'react-stripe-checkout'
import Axios from 'axios'

const PUBLISHABLE_KEY = 'pk_test_mpvb7iBiITCLiYi2TESdgdkQ'
const CURRENCY = 'USD'

const successMsg = () => {
  alert('Payment successful!')
}

const errorMsg = () => {
  alert('Payment error')
}

const onToken = (amount, clearCart) => async token => {
  try {
    await Axios.post('/api/payment/', {
      source: token.id,
      amount: amount,
      currency: CURRENCY
    })
    successMsg()
    clearCart()
  } catch (error) {
    errorMsg()
  }
}

class CheckoutForm extends Component {
  render() {
    const {total, clearCart} = this.props
    return (
      <StripeCheckout
        amount={total}
        token={onToken(total, clearCart)}
        currency={CURRENCY}
        stripeKey={PUBLISHABLE_KEY}
      />
    )
  }
}
export default CheckoutForm
