import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getCartItems} from '../store/product'

class Cart extends Component {
  constructor() {
    super()
    this.state = {
      items: []
    }
  }

  componentDidMount = async () => {
    await this.props.getCartItems()
    this.setState({items: this.props.items})
  }

  handleSubmit = () => {}

  render() {
    return (
      <div>
        <div id="basket">
          <h2>Your items</h2>
          {this.state.items.length ? (
            this.state.items.map(item => (
              <div key={item.id}>
                <h3>{item.productName}</h3>
                <img src={item.imageUrl} />
                <p>${(item.price / 100).toFixed(2)}</p>
                <p>{item.quantity}</p>
                <button type="submit">REMOVE</button>
              </div>
            ))
          ) : (
            <p>Your cart is empty!</p>
          )}
        </div>
        <div id="order-summary">
          <h2>Summary</h2>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    items: state.product.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getCartItems: () => dispatch(getCartItems())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
