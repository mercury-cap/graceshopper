import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllProducts} from '../store/product'
import {Link} from 'react-router-dom'

class AllProducts extends Component {
  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    // let products = this.props.products
    // console.log(products)
    return (
      <div>
        <h3>All Products:</h3>
        <div>
          Filter
          <select>
            <option>Sauces</option>
            <option>Sauces</option>
          </select>
        </div>
        <div id="product-list">
          {this.props.products.map(product => (
            <Link to={`/products/${product.id}`} key={product.id}>
              <div className="product">
                <h2 className="product-name">{product.name}</h2>
                <p>
                  <img className="product-img" src={product.imageUrl} />
                </p>
                <p className="product-price">${product.price}</p>
              </div>
            </Link>
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
