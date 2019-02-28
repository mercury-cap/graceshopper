import React, {Component} from 'react'
import {connect} from 'react-redux'

class Cart extends Component {
  constructor() {
    super()
    this.state = {
      items: []
    }
  }

  componentDidMount = () => {}

  handleSubmit = () => {}

  render() {
    // console.log(this.props)
    return (
      <div>
        <h1>Your items</h1>
        {this.props.items.length ? (
          this.props.items.map(item => (
            <div key={item.productId}>
              <h3>{item.productName}</h3>
              <img src={item.imageUrl} />
              <p>${(item.price / 100).toFixed(2)}</p>
              <p>{item.quantity}</p>
            </div>
          ))
        ) : (
          <p>Your cart is empty!</p>
        )}
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
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
