import React, {Component} from 'react'
import StripeCheckout from 'react-stripe-checkout'
import Axios from 'axios'

// export default class CheckoutForm extends Component {
//   componentDidMount() {
//     const script = document.createElement('script')
//     script.src ='//checkout.stripe.com/v2/checkout.js'
//     script.className = 'stripe-button active'
//     script.setAttribute('data-key', keyPublishable)
//     script.setAttribute('data-locale', 'auto')
//     script.setAttribute('data-description', 'sample charge')
//     script.setAttribute('data-amount', '500')
//     document.querySelector('form').appendChild(script)
//   }

//   render() {
//     // return pug`
//     //   form(action="/api/payment/charge", method="post")
//     //     script(
//     //       src="//checkout.stripe.com/v2/checkout.js",
//     //       class="stripe-button",
//     //       data-key=${keyPublishable},
//     //       data-locale="auto",
//     //       data-description="Sample Charge",
//     //       data-amount=${this.props.total})
//     //   `
//     return (
//       <form action="/api/payment/charge" method="post" />
//     )
//   }
// }

const PUBLISHABLE_KEY = 'pk_test_mpvb7iBiITCLiYi2TESdgdkQ'
const CURRENCY = 'USD'

const onToken = amount => token =>
  Axios.post('/api/payment/', {
    source: token.id,
    amount: amount,
    currency: CURRENCY
  })

const CheckoutForm = ({total}) => (
  <StripeCheckout
    amount={total}
    token={onToken(total)}
    currenty={CURRENCY}
    stripeKey={PUBLISHABLE_KEY}
  />
)

export default CheckoutForm
