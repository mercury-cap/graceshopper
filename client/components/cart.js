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
    // this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount = async () => {
    await this.props.getCartItems()
    // this.setState({items: this.props.items})
  }

  // remove = async event => {
  //   const itemId = event.target.value
  //   await this.props.deleteItem(itemId)
  //   await this.props.getCartItems()
  // }

  handleChange = event => {
    const newQuantity = event.target.value
  }

  render() {
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    console.log('PROPS: ', this.props)
    const itemsList = this.props.items.length ? (
      this.props.items.map(item => (
        <tr key={item.id}>
          <td>{item.name}</td>
          <td>${(item.price / 100).toFixed(2)}</td>
          <td>
            <select onChange={this.handleChange} className="browser-default">
              <option selected>
                {item.order_items ? item.order_items.quantity : 1}
              </option>
              {numbers
                .filter(
                  number =>
                    number !==
                    (item.order_items ? item.order_items.quantity : 1)
                )
                .map(num => <option key={num}>{num}</option>)}
            </select>
          </td>
          <td>
            <button
              type="submit"
              onClick={() => this.props.deleteItem(item.id)}
              value={item.id}
            >
              REMOVE
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

const mapStateToProps = state => ({
  items: state.product.cart
})

const mapDispatchToProps = dispatch => ({
  getCartItems: () => dispatch(getCartItems()),
  deleteItem: itemId => dispatch(removeItem(itemId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
