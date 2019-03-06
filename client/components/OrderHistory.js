import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getOrders} from '../store/product'

class OrderHistory extends Component {
  constructor() {
    super()
    this.state = {cart: {}}
  }

  componentDidMount = async () => {
    await this.props.getUserOrders(this.props.match.params.userId)
    this.setState({cart: this.props.items})
  }

  render() {
    console.log('cart:', this.props.items)
    console.log('state:', this.state)

    console.log(this.props.match.params.userId)
    const orders = this.props.items
    console.log('total', orders)
    const orderHistory = orders.length ? (
      orders.map(order => (
        <div key={order.id}>
          <h5>Order #: {order.id}</h5>

          <p>Order Date: {order.createdAt.slice(0, 10)}</p>
          <p>Order Total: ${(order.total / 100).toFixed(2)}</p>

          {order.products.map(item => (
            <tr className="cart-item" key={item.name}>
              <td>
                <p>
                  {item.order_items.quantity} {item.name}
                </p>
              </td>
              <td>
                <p>${(item.price / 100).toFixed(2)}/each</p>
              </td>
            </tr>
          ))}
          <hr />
        </div>
      ))
    ) : (
      <p>You have not made a purchase.</p>
    )
    return (
      <div className="container">
        <div />
        <div>
          <h1>Order History</h1>
        </div>
        <table>
          {/* <thead>
            <tr>
              <th>Item Name</th>
              <th>Item Price</th>
              <th>Item Quantity</th>
              <th>Remove</th>
            </tr>
          </thead> */}

          <tbody>{orderHistory}</tbody>
        </table>

        {/* <div>{orderHistory}</div> */}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  items: state.product.orders
  //   cartId: state.product.cartId
})

const mapDispatchToProps = dispatch => ({
  getUserOrders: userId => dispatch(getOrders(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory)
