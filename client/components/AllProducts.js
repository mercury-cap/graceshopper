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
    this.setState({
      heat: e.target.value
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
              <div className="card-content black">
                <div className="orange-text">
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
          <p>Select your heat</p>
          <select onChange={this.handleHeatChange} className="browser-default">
            <option value="all">All</option>
            <option value="mild">Mild</option>
            <option value="hot">Hot</option>
            <option value="insane">Insane</option>
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
