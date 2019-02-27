import React, {Component} from 'react'
import {connect} from 'react-redux'

class SingleProduct extends Component {
  render() {
    return <div>Hey from single product</div>
  }
}

const mapStateToProps = state => {
  return {
    product: state.products.products
  }
}

export default connect(mapStateToProps)(SingleProduct)
