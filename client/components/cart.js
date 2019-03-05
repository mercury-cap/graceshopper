import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  getCartItems,
  removeItem,
  updateQuantity,
  removeCart
} from '../store/product'

class Cart extends Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount = async () => {
    await this.props.getCartItems()
  }

  handleChange = event => {
    const quantity = event.target.value
    const productId = event.target.name
    this.props.updateQuantity(quantity, productId)
  }

  render() {
    const orderId = this.props.cart
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const itemsList = this.props.items.length ? (
      this.props.items.map(item => (
        <tr className="cart-item" key={item.id}>
          <td>
            <Link to={`/products/${item.id}`}>{item.name}</Link>
          </td>
          <td>${(item.price / 100).toFixed(2)}</td>
          <td>
            <select
              onChange={this.handleChange}
              name={item.id}
              className="browser-default"
            >
              {numbers.map(
                number =>
                  number !==
                  (item.order_items ? item.order_items.quantity : 1) ? (
                    <option key={number}>{number}</option>
                  ) : (
                    <option key={item.order_items.quantity} selected>
                      {item.order_items ? item.order_items.quantity : 1}
                    </option>
                  )
              )}
            </select>
          </td>
          <td>
            <button
              type="submit"
              onClick={() => this.props.deleteItem(item.id)}
              value={item.id}
            >
              Remove
            </button>
          </td>
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
              <th>Remove</th>
            </tr>
          </thead>

          <tbody>{itemsList}</tbody>
        </table>

        {this.props.items.length ? (
          <button
            className="waves-effect waves-light amber darken-4 btn"
            onClick={() => this.props.clearCart(orderId)}
            type="submit"
          >
            Clear Cart
          </button>
        ) : (
          <Link to="/">
            <button
              className="waves-effect waves-light amber darken-4 btn"
              type="submit"
            >
              Add Items
            </button>
          </Link>
        )}
        {this.props.items.length ? (
          <div>
            <h3 id="cart-subtotal">
              <strong>Subtotal</strong>: $
              {(
                this.props.items.reduce(
                  (sum, item) => sum + item.price * item.order_items.quantity,
                  0
                ) / 100
              ).toFixed(2)}
            </h3>

            <Link to="/checkout">
              <button
                className="waves-effect waves-light amber darken-4 btn"
                type="submit"
              >
                Proceed to checkout
              </button>
            </Link>
          </div>
        ) : null}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  items: state.product.cart,
  cart: state.product.cartId
})

const mapDispatchToProps = dispatch => ({
  getCartItems: () => dispatch(getCartItems()),
  deleteItem: itemId => dispatch(removeItem(itemId)),
  updateQuantity: (quantity, itemId) =>
    dispatch(updateQuantity(quantity, itemId)),
  clearCart: orderId => dispatch(removeCart(orderId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
