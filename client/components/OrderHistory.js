import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getOrders} from '../store/product'
import {Link} from 'react-router-dom'

class OrderHistory extends Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount = async () => {
    await this.props.getUserOrders(this.props.match.params.userId)
  }

  render() {
    const orders = this.props.items

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
                  <Link to={`/products/${item.order_items.productId}`}>
                    {item.order_items.quantity} {item.name}
                  </Link>
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
          <tbody>{orderHistory}</tbody>
        </table>
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
