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
        <tbody key={order.id}>
          <tr>
            <h5>Order #: {order.id}</h5>
          </tr>
          <tr>Order Date: {order.createdAt.slice(0, 10)}</tr>
          <tr>Order Total: ${(order.total / 100).toFixed(2)}</tr>
          {order.products.map(item => (
            <tr className="cart-item" key={item.name}>
              <td>
                <Link to={`/products/${item.order_items.productId}`}>
                  {item.order_items.quantity} {item.name}
                </Link>
              </td>
              <td>${(item.price / 100).toFixed(2)}/each</td>
            </tr>
          ))}
          <hr />
        </tbody>
      ))
    ) : (
      <tbody>
        <tr>You have not made a purchase.</tr>
      </tbody>
    )
    return (
      <div className="container">
        <div />
        <div>
          <h1>Order History</h1>
        </div>
        <table>{orderHistory}</table>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  items: state.product.orders
})

const mapDispatchToProps = dispatch => ({
  getUserOrders: userId => dispatch(getOrders(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory)
