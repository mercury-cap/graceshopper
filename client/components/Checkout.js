import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCartItems} from '../store/product'
import CheckoutForm from './CheckoutForm'

class Checkout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      subtotal: 0,
      tax: 0,
      shipping: 300
    }
    this.handleClick = this.handleClick.bind(this)
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

  handleClick = () => {
    console.log('HELLOOO BUTTON')
  }

  render() {
    const {items, subtotal, tax, shipping} = this.state

    return (
      <div id="checkout">
        <div id="order-summary">
          <h3>Order Summary</h3>
          <table id="checkout-items">
            <tbody>
              {items.map(item => (
                <tr id="checkout-single-item" key={item.id}>
                  <td>
                    {item.name} ({item.order_items.quantity})
                  </td>
                  <td>
                    ${(item.price * item.order_items.quantity / 100).toFixed(2)}
                  </td>
                </tr>
              ))}
              <tr>
                <td>
                  <b>Subtotal</b>
                </td>
                <td>
                  <h4>${(subtotal / 100).toFixed(2)}</h4>
                </td>
              </tr>
              <tr>
                <td>Shipping & Handling</td>
                <td>${(shipping / 100).toFixed(2)}</td>
              </tr>
              <tr>
                <td>Tax</td>
                <td>${(tax / 100).toFixed(2)}</td>
              </tr>
              <tr>
                <td>
                  <h3>Order Total</h3>
                </td>
                <td>
                  <h3>${((subtotal + shipping + tax) / 100).toFixed(2)}</h3>
                </td>
              </tr>
            </tbody>
          </table>
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
