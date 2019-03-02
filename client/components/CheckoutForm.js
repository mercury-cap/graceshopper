import React, {Component} from 'react'
const keyPublishable = process.env.PUBLISHABLE_KEY

export default class CheckoutForm extends Component {
  componentDidMount() {
    const script = document.createElement('script')
    script.setAttribute('src', '//checkout.stripe.com/v2/checkout.js')
    script.className = 'stripe-button active'
    script.setAttribute('data-key', keyPublishable)
    script.setAttribute('data-locale', 'auto')
    script.setAttribute('data-description', 'sample charge')
    script.setAttribute('data-amount', '500')
    document.querySelector('head').appendChild(script)
  }

  render() {
    return pug`
      form(action="/api/payment/charge", method="post")
        script(
          src="//checkout.stripe.com/v2/checkout.js",
          class="stripe-button",
          data-key=keyPublishable,
          data-locale="auto",
          data-description="Sample Charge",
          data-amount=${this.props.total})
      `
  }
}
