import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCartItems} from '../store/product'

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
      tax: subtotal * 0.08875
    })
  }

  handleClick = () => {
    console.log('HELLOOO BUTTON')
  }

  render() {
    return (
      <div>
        <h3>Order Summary</h3>
        <table id="checkout-items">
          <tbody>
            {this.state.items.map(item => (
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
                <h4>Subtotal</h4>
              </td>
              <td>
                <h4>${(this.state.subtotal / 100).toFixed(2)}</h4>
              </td>
            </tr>
            <tr>
              <td>Shipping & Handling</td>
              <td>${(this.state.shipping / 100).toFixed(2)}</td>
            </tr>
            <tr>
              <td>Tax</td>
              <td>${(this.state.tax / 100).toFixed(2)}</td>
            </tr>
            <tr>
              <td>
                <h3>Order Total</h3>
              </td>
              <td>
                <h3>
                  ${(
                    (this.state.subtotal + 300 + this.state.tax) /
                    100
                  ).toFixed(2)}
                </h3>
              </td>
            </tr>
          </tbody>
        </table>
        <button type="submit" onClick={this.handleClick}>
          Place Your Order
        </button>
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
