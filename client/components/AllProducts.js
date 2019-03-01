import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllProducts} from '../store/product'
import {NavLink} from 'react-router-dom'

class AllProducts extends Component {
  componentDidMount() {
    this.props.getProducts()
  }

  render() {
    const productList = this.props.products || []

    const productCard = productList.map(product => {
      return (
        <div className="col s12 m6 l3" key={product.id}>
          <div className="card small">
            <div className="card-image small">
              <img src={product.imageUrl} />
            </div>
            <div className="card-content">
              <NavLink to={`/products/${product.id}`} />
              <h5 className="indigo-text">{product.name}</h5>
            </div>
          </div>
        </div>
      )
    })

    return (
      <div>
        <div>
          Filter
          <select>
            <option>Sauces</option>
            <option>Sauces</option>
          </select>
        </div>

        <div className="container">
          <div className="row">
            {productCard.length ? productCard : <p>No product</p>}
          </div>
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
