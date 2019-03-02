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
    const itemsList = this.state.items.length ? (
      this.state.items.map(item => (
        <tr Key={item.id}>
          <td>{item.name}</td>
          <td>
            <p>${(item.price / 100).toFixed(2)}</p>
          </td>
          <td>
            <p>{item.order_items.quantity}</p>
          </td>
        </tr>
      ))
    ) : (
      <p>Your cart is empty!</p>
    )

    return (
      <div className="container">
        <h2>Your items</h2>
        <table>
          <thead>
            <tr>
              <th>Item Name</th>
              <th>Item Price</th>
              <th>Item Quantity</th>
            </tr>
          </thead>

          <tbody>{itemsList}</tbody>
        </table>
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
