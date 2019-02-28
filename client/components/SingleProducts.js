import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSingleProduct, updateCartInServer} from '../store/product'

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
    this.props.addToCart({
      productId: this.props.product.id,
      productName: this.props.product.name,
      quantity: this.state.quantity
    })
  }

  render() {
    // console.log(this.props)
    return (
      <div id="single-product">
        <img src={this.props.product.imageUrl} />
        <div id="product-details">
          <h1>{this.props.product.name}</h1>
          <p>Origin: {this.props.product.country}</p>
          <p>Scoville Heat Units (SHU): {this.props.product.scoville}</p>
          <p>Product type: {this.props.product.type}</p>
          <p>Price: {`$${this.props.product.price}`}</p>
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
          <button type="submit" onClick={this.handleSubmit}>
            Add to Cart
          </button>
        </div>
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
    getSingleProduct: id => dispatch(getSingleProduct(id)),
    addToCart: item => dispatch(updateCartInServer(item))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
