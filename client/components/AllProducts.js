import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllProducts} from '../store/product'

class AllProducts extends Component {
  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    console.log(this.props.products)
    return (
      <div>
        <h1>Products:</h1>
        <div>
          {this.props.products.map(product => (
            <h2 key={product.name}>{product.name}</h2>
          ))}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.product.products
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getProducts: () => dispatch(getAllProducts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllProducts)
