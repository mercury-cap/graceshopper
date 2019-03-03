import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCartItems} from '../store/product'
import CheckoutForm from './CheckoutForm'
import CheckoutSummary from './CheckoutSummary'

class Checkout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      subtotal: 0,
      tax: 0,
      shipping: 300
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
      tax: Math.floor(subtotal * 0.08875)
    })
  }

  render() {
    const {subtotal, tax, shipping} = this.state
    return (
      <div id="checkout">
        <div id="order-summary">
          <h3>Order Summary</h3>
          <CheckoutSummary {...this.state} />
          <CheckoutForm total={subtotal + shipping + tax} />
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  items: state.product.cart
})

const mapDispatchToProps = dispatch => ({
  getCartItems: () => dispatch(getCartItems())
})

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
