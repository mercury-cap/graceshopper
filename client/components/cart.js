import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {getCartItems, removeItem} from '../store/product'


class Cart extends Component {
  constructor() {
    super()
    this.state = {
      items: []
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount = async () => {
    await this.props.getCartItems()
  }

  handleSubmit = event => {
    const itemId = event.target.value
    this.props.deleteItem(itemId)
  }

  render() {
    const itemsList = this.props.items.length ? (
      this.props.items.map(item => (
        <tr key={item.id}>
          <td>{item.name}</td>
          <td>${(item.price / 100).toFixed(2)}</td>
          <td>{item.order_items.quantity}</td>
         <td><button
            type="submit"
            onClick={this.handleSubmit}
            value={item.id}
            >
            REMOVE
            </button></td>
        </tr>
      ))
    ) : (
      <tr>
        <td>Your cart is empty!</td>
      </tr>
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
              <th>Remove<th>
            </tr>
          </thead>

          <tbody>{itemsList}</tbody>
        </table>
        {this.props.items.length ? (
          <Link to="/checkout">
            <button
              className="waves-effect waves-light amber darken-4 btn"
              type="submit"
            >
              Proceed to checkout
            </button>
          </Link>
        ) : null}
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
    getCartItems: () => dispatch(getCartItems()),
    deleteItem: itemId => dispatch(removeItem(itemId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
