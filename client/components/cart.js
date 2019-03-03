import React, {Component} from 'react'
import {connect} from 'react-redux'
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
    this.setState({items: this.props.items})
  }

  handleSubmit = event => {
    const itemId = event.target.value
    const itemToDelete = this.state.items.filter(
      item => item.id === Number(itemId)
    )
    console.log('Remove', itemToDelete)
    this.props.deleteItem(itemToDelete)
    this.setState({items: this.props.items})
    console.log(this.state)
  }

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
    deleteItem: item => dispatch(removeItem(item))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
