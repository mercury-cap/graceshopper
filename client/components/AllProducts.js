import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllProducts} from '../store/product'
import {NavLink} from 'react-router-dom'

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
    console.log('in country change handler: ', e.target.value)
    this.setState({
      country: e.target.value
    })
  }

  render() {
    console.log('render, new state: ', this.state)

    let productList = this.props.products || []
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

    const countries = productList.reduce((uniqueCountries, product) => {
      if (!uniqueCountries.includes(product.country)) {
        uniqueCountries.push(product.country)
        return uniqueCountries
      } else {
        return uniqueCountries
      }
    }, [])

    if (heat !== 'all') {
      productList = productList.filter(
        product => getHeat(product.scoville) === heat
      )
    }
    if (country !== 'all') {
      productList = productList.filter(product => product.country === country)
    }

    const productCard = productList.map(product => {
      return (
        <NavLink to={`/products/${product.id}`} key={product.id}>
          <div className="col s12 m6 l3">
            <div className="card small">
              <div className="cardimage">
                <img src={product.imageUrl} />
              </div>
              <div className="card-content #f5f5f5 grey lighten-4 center-align">
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
        <div className="container">
          <p>Filter by:</p>
          <div className="row" id="filters">
            <div id="heat-filter" className="col s6">
              <span className="filter-cat">
                <strong>HEAT</strong>
              </span>
              <a
                className="waves-effect waves-light btn #424242 grey darken-3"
                name="mild"
                onClick={this.handleHeatChange}
              >
                🔥
              </a>
              <a
                className="waves-effect waves-light btn #424242 grey darken-3"
                name="hot"
                onClick={this.handleHeatChange}
              >
                🔥🔥
              </a>
              <a
                className="waves-effect waves-light btn #424242 grey darken-3"
                name="insane"
                onClick={this.handleHeatChange}
              >
                🔥🔥🔥
              </a>
              <a className="waves-effect waves-light btn-small">All</a>
            </div>
            <div id="country-filter" className="col s6">
              <span className="filter-cat">
                <strong>ORIGIN</strong>
              </span>
              <select
                onChange={this.handleCountryChange}
                className="browser-default"
              >
                <option selected value="all">
                  Choose A Destination
                </option>
                {countries.map(countryUnique => (
                  <option key={countryUnique} value={countryUnique}>
                    {countryUnique}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col s1" />
          <div className="col s10">
            {productCard.length ? productCard : <p>No product</p>}
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
