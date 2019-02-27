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
        <p>name: {this.props.product.name}</p>
        <p>country: </p>
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
