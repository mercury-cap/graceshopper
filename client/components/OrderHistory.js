import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getOrders} from '../store/product'

class OrderHistory extends Component {
  state = {}

  componentDidMount = () => {
    this.props.getUserOrders(this.props.match.params.userId)
  }

  render() {
    console.log('cart:', this.props.items)
    console.log(this.props.match.params.userId)
    const orders = this.props.items
    return (
      <div>
        <div>
          <h2>Order History</h2>
        </div>
        {orders.map(order => (
          <div key={order.id}>
            <p>Order #: {order.id}</p>
            {order.products.map(item => (
              <div key={item.name}>
                <p>{item.name}</p>
                <p>${(item.price / 100).toFixed(2)}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  items: state.product.cart
  //   cartId: state.product.cartId
})

const mapDispatchToProps = dispatch => ({
  getUserOrders: userId => dispatch(getOrders(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory)
