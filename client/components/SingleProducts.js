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
    const scriptFb = document.createElement('script')
    scriptFb.src =
      'https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v3.2'
    scriptTw.async = true
    document.body.appendChild(scriptTw)
    document.body.appendChild(scriptFb)
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
    console.log('Props: ', this.props)
    const {product, match} = this.props
    return (
      <div className="container" id="single-product">
        <div className="row">
          <div className="col s6 center">
            <img width="50%" src={product.imageUrl} />
          </div>
          <div className="col s6">
            <div id="product-details">
              <h2>{product.name}</h2>
              <p>Origin: {product.country}</p>
              <p>Scoville Heat Units (SHU): {product.scoville}</p>
              <p>Product type: {product.type}</p>
              <p>Price: {`$${(product.price / 100).toFixed(2)}`}</p>
              <p>Quantity: {this.state.quantity}</p>
              <button type="button" onClick={this.add}>
                +
              </button>
              <button
                type="button"
                onClick={this.subtract}
                disabled={this.state.quantity === 0}
              >
                -
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
                <div
                  className="fb-share-button"
                  data-href={`https://mercury-cap-graceshopper.herokuapp.com/products/${
                    match.params.id
                  }`}
                  data-layout="button"
                  data-size="small"
                  data-mobile-iframe="true"
                >
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fmercury-cap-graceshopper.herokuapp.com%2Fproducts%2F${
                      match.params.id
                    }&amp;src=sdkpreparse`}
                    className="fb-xfbml-parse-ignore"
                  >
                    Share
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
