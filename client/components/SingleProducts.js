import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSingleProduct} from '../store/product'

class SingleProduct extends Component {
  componentDidMount = () => {
    this.props.getSingleProduct(this.props.match.params.id)
  }
  render() {
    console.log(this.props)
    return (
      <div>
        <p>Name: {this.props.product.name}</p>
        <p>Origin: {this.props.product.country}</p>
        <p>Scoville Heat Units (SHU): {this.props.product.scoville}</p>
        <p>Product type: {this.props.product.type}</p>
        <p>Quantity: {this.props.product.quantity}</p>
        <p>Price: {this.props.product.price}</p>
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
