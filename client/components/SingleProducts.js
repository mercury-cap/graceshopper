import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getSingleProduct, updateCartInServer} from '../store/product'

class SingleProduct extends Component {
  constructor() {
    super()
    this.state = {
      quantity: 1
    }
  }

  componentDidMount = () => {
    this.props.getSingleProduct(this.props.match.params.id)
  }

  componentDidUpdate = () => {
    const scriptTw = document.createElement('script')
    scriptTw.src = 'https://platform.twitter.com/widgets.js'
    scriptTw.async = true
    scriptTw.charset = 'utf-8'
    scriptTw.defer = true
    document.body.appendChild(scriptTw)
  }

  add = () => {
    this.setState(prevState => ({quantity: prevState.quantity + 1}))
  }

  subtract = () => {
    this.setState(prevState => ({quantity: prevState.quantity - 1}))
  }

  handleSubmit = () => {
    this.props.addToCart({
      productId: this.props.product.id,
      productName: this.props.product.name,
      quantity: this.state.quantity,
      price: this.props.product.price,
      imageUrl: this.props.product.imageUrl
    })
    this.props.history.push('/')
  }

  render() {
    const {product} = this.props

    const getHeat = scoville => {
      if (scoville <= 10000) {
        return '🔥'
      } else if (scoville <= 50000) {
        return '🔥🔥'
      } else {
        return '🔥🔥🔥'
      }
    }

    return (
      <div className="container" id="single-product">
        <div className="row">
          <div className="col s6 center" id="product-image">
            <img width="50%" src={product.imageUrl} />
          </div>
          <div className="col s6">
            <div id="product-details">
              <h2>{product.name}</h2>
              <p>
                <strong>Origin</strong>: {product.country}
              </p>
              <p>
                <strong>Heat Level</strong>: {getHeat(product.scoville)}
              </p>
              <p>
                <strong>Scoville Heat Units (SHU)</strong>: {product.scoville}
              </p>
              <p>
                <strong>Product type</strong>: {product.type}
              </p>
              <p>
                <strong>Price</strong>: {`$${(product.price / 100).toFixed(2)}`}
              </p>
              <p>
                <strong>Quantity</strong>: {this.state.quantity}
              </p>
              <button
                type="button"
                onClick={this.subtract}
                disabled={this.state.quantity === 0}
              >
                -
              </button>
              <button type="button" onClick={this.add}>
                +
              </button>
              <button type="submit" onClick={this.handleSubmit}>
                Add to Cart
              </button>
              <div id="social-media-btns">
                <div>
                  <a
                    href="https://twitter.com/share?ref_src=twsrc%5Etfw"
                    className="twitter-share-button"
                    data-text={`Oowee! Diggin' this ${product.name} sauce at`}
                    data-url={`https://mercury-cap-graceshopper.herokuapp.com${
                      location.pathname
                    }`}
                    data-hashtags="hotnsaucy"
                    data-show-count="false"
                  >
                    Tweet
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
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
    getSingleProduct: id => dispatch(getSingleProduct(id)),
    addToCart: item => dispatch(updateCartInServer(item))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
