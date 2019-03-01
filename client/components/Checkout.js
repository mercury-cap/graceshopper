import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCartItems} from '../store/product'

class Checkout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      items: [],
      subtotal: 0
    }
    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount = async () => {
    await this.props.getCartItems()
    this.setState({
      items: this.props.items,
      subtotal: (
        this.props.items.reduce((sum, item) => sum + item.price, 0) / 100
      ).toFixed(2)
    })
  }

  handleClick = () => {
    console.log('HELLOOO BUTTON')
  }

  render() {
    return (
      <div>
        <h1>ORDER SUMMARY</h1>
        <div id="checkout-items">
          {this.state.items.map(item => (
            <div id="checkout-single-item" key={item.id}>
              <p>{item.name}</p>
              <p>${(item.price / 100).toFixed(2)}</p>
            </div>
          ))}
          <h3>Total before tax:</h3>
          <p>${this.state.subtotal}</p>
          <h3>Tax:</h3>
          <h1>Order Total</h1>
        </div>

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
