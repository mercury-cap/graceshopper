import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSingleProduct} from '../store/product'

class SingleProduct extends Component {
  constructor() {
    super()
    this.state = {
      quantity: 0
    }
  }

  componentDidMount = () => {
    this.props.getSingleProduct(this.props.match.params.id)
  }

  add = () => {
    // add upper limit based on inventory
    this.setState(prevState => ({quantity: prevState.quantity + 1}))
  }

  subtract = () => {
    this.setState(prevState => ({quantity: prevState.quantity - 1}))
  }

  handleSubmit = () => {
    const subtotal = this.state.quantity * this.props.product.price
  }
  // handleSubmit must add order subtotal into store so that cart can access

  render() {
    console.log(this.props)
    return (
      <div>
        <p>Name: {this.props.product.name}</p>
        <p>Origin: {this.props.product.country}</p>
        <p>Scoville Heat Units (SHU): {this.props.product.scoville}</p>
        <p>Product type: {this.props.product.type}</p>
        <p>Quantity: {this.state.quantity}</p>
        <button type="button" onClick={this.add}>
          +
        </button>
        <button
          type="button"
          onClick={this.subtract}
          disabled={this.state.quantity === 0}
        >
          -
        </button>
        <p>Price: {this.props.product.price}</p>
        <button type="submit" onClick={this.handleSubmit}>
          Add to Cart
        </button>
        <img src={this.props.product.imageUrl} />
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    product: state.product.singleProduct
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getSingleProduct: id => dispatch(getSingleProduct(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
