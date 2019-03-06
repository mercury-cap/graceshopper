import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllProducts} from '../store/product'
import {NavLink} from 'react-router-dom'
import Filters from './Filters'

class AllProducts extends Component {
  constructor() {
    super()
    this.state = {
      heat: 'all',
      country: 'all'
    }
  }

  componentDidMount() {
    this.props.getProducts()
  }

  handleHeatChange = e => {
    this.setState({
      heat: e.target.name
    })
  }

  handleCountryChange = e => {
    this.setState({
      country: e.target.value
    })
  }

  render() {
    const {heat, country} = this.state

    const getHeat = scoville => {
      if (scoville <= 10000) {
        return 'mild'
      } else if (scoville <= 50000) {
        return 'hot'
      } else {
        return 'insane'
      }
    }

    let filteredProducts = this.props.products

    if (heat !== 'all' || country !== 'all') {
      filteredProducts = this.props.products.filter(product => {
        const heatOption = heat === 'all' ? 'all' : getHeat(product.scoville)
        const countryOption = country === 'all' ? 'all' : product.country
        return heatOption === heat && countryOption === country
      })
    }

    const countryList = this.props.products.reduce(
      (uniqueCountries, product) => {
        if (!uniqueCountries.includes(product.country)) {
          uniqueCountries.push(product.country)
          return uniqueCountries
        } else {
          return uniqueCountries
        }
      },
      []
    )

    const productCard = filteredProducts.map(product => {
      return (
        <NavLink to={`/products/${product.id}`} key={product.id}>
          <div className="col s12 m6 l3">
            <div className="card small">
              <div className="cardimage">
                <img src={product.imageUrl} />
              </div>
              <div className="card-content center-align #bdbdbd grey lighten-1">
                <div className="black-text">
                  <strong>{product.name}</strong>
                </div>
              </div>
            </div>
          </div>
        </NavLink>
      )
    })

    return (
      <div>
        <div className="container" id="filters-bar">
          <Filters
            handleHeatChange={this.handleHeatChange}
            handleCountryChange={this.handleCountryChange}
            heat={this.state.heat}
            countryList={countryList}
          />
        </div>
        <div className="row">
          <div className="col s1" />
          <div className="col s10">
            {productCard.length ? (
              productCard
            ) : (
              <p>No products match your search.</p>
            )}
          </div>
          <div className="col s1" />
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
