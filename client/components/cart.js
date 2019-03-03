import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
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
    // this.setState({items: this.props.items})
  }

  handleSubmit = event => {
    const itemId = event.target.value
    this.props.deleteItem(itemId)
  }

  render() {
    return (
      <div>
        <div id="basket">
          <h2>Your items</h2>
          {this.props.items.length ? (
            this.props.items.map(item => (
              <div key={item.id}>
                <h3>{item.productName}</h3>
                <img src={item.imageUrl} />
                <p>${(item.price / 100).toFixed(2)}</p>
                <p>{item.quantity}</p>
                <button
                  type="submit"
                  onClick={this.handleSubmit}
                  value={item.id}
                >
                  REMOVE
                </button>
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
    getCartItems: () => dispatch(getCartItems()),
    deleteItem: itemId => dispatch(removeItem(itemId))
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart))
