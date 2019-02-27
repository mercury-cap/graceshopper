import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllProducts} from '../store/product'

class AllProducts extends Component {
  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    let products = this.props.products
    console.log(products)
    return (
      <div>
        <h1>Products:</h1>
        <div>
          {this.props.products.map(product => (
            <div key={product.name}>
              <h2>{product.name}</h2>
              <p>
                <img src={product.imageUrl} />
              </p>
              <p>${product.price}</p>
            </div>
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
