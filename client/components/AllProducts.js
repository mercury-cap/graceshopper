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
    console.log(this.props)

    const productCard = productList.map(product => {
      return (
        <div className="col s12 m6 l3" key={product.id}>
          <div className="card small">
            <div className="card-image">
              <img src={product.imageUrl} />
            </div>
            <div className="card-content">
              <NavLink to={`/products/${product.id}`}>
                <div className="orange-text">{product.name}</div>
              </NavLink>
            </div>
          </div>
        </div>
      )
    })

    return (
      <div>
        <div>
          <p>Filter</p>
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
