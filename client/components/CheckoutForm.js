import React, {Component} from 'react'
import StripeCheckout from 'react-stripe-checkout'

const PUBLISHABLE_KEY = 'pk_test_mpvb7iBiITCLiYi2TESdgdkQ'
const CURRENCY = 'USD'

class CheckoutForm extends Component {
  render() {
    const {total, clearCart, cartId, onToken} = this.props
    return (
      <StripeCheckout
        amount={total}
        token={onToken(total, clearCart, cartId)}
        currency={CURRENCY}
        stripeKey={PUBLISHABLE_KEY}
      />
    )
  }
}
export default CheckoutForm
