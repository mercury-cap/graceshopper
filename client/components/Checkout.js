import React, {Component} from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import {getCartItems, completeCheckout} from '../store/product'
import CheckoutForm from './CheckoutForm'
import CheckoutSummary from './CheckoutSummary'

class Checkout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      subtotal: 0,
      tax: 0,
      shipping: 0
    }
  }

  componentDidMount = async () => {
    await this.props.getCartItems()
    const subtotal = this.props.items.reduce(
      (sum, item) => sum + item.price * item.order_items.quantity,
      0
    )
    this.setState({
      items: this.props.items,
      subtotal: subtotal,
      tax: Math.floor(subtotal * 0.08875),
      shipping: this.props.items.length ? 300 : 0
    })
  }

  onToken = (amount, clearCart, cartId) => async token => {
    try {
      await axios.post('/api/payment/', {
        source: token.id,
        amount: amount,
        currency: 'USD'
      })
      clearCart(cartId, amount)
      alert('Payment successful!')
      this.props.history.push('/')
    } catch (error) {
      alert('Payment error')
    }
  }

  render() {
    const {subtotal, tax, shipping} = this.state
    return (
      <div>
        <CheckoutSummary {...this.state} />
        <div className="center-align">
          <CheckoutForm
            total={subtotal + shipping + tax}
            clearCart={this.props.clearCart}
            cartId={this.props.cartId}
            onToken={this.onToken}
          />
        </div>
        <div className="row" />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  items: state.product.cart,
  cartId: state.product.cartId
})

const mapDispatchToProps = dispatch => ({
  getCartItems: () => dispatch(getCartItems()),
  clearCart: (id, amt) => dispatch(completeCheckout(id, amt))
})

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
