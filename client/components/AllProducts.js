import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllProducts} from '../store/product'
import {NavLink} from 'react-router-dom'

class AllProducts extends Component {
  constructor() {
    super()
    this.state = {
      heat: 'all'
    }
  }

  componentDidMount() {
    this.props.getProducts()
  }

  handleHeatChange = e => {
    console.log('Event target: ', typeof e.target.name)
    this.setState({
      heat: e.target.name
    })
  }

  render() {
    const getHeat = scoville => {
      if (scoville <= 10000) {
        return 'mild'
      } else if (scoville <= 50000) {
        return 'hot'
      } else {
        return 'insane'
      }
    }

    let productList = this.props.products || []
    const {heat} = this.state

    if (heat !== 'all') {
      productList = productList.filter(
        product => getHeat(product.scoville) === heat
      )
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
          <div id="filters">
            <div>
              <span className="filter-cat">
                <strong>Heat</strong>
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
            </div>
            <div id="country-filter">
              <span className="filter-cat">
                <strong>Country of Origin</strong>
              </span>
              <select
                onChange={this.handleCountryChange}
                className="browser-default"
              >
                <option value="all">All</option>
                <option value="mild">🔥</option>
                <option value="hot">🔥🔥</option>
                <option value="insane">🔥🔥🔥</option>
              </select>
            </div>
          </div>
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
