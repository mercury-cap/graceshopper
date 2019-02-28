import React, {Component} from 'react'
import {connect} from 'react-redux'

class Cart extends Component {
  constructor() {
    super()
    this.state = {
      items: []
    }
  }

  componentDidMount = () => {}

  handleSubmit = () => {}

  render() {
    // console.log(this.props)
    return <h1>CART ITEMS HERE</h1>
  }
}

const mapStateToProps = state => {
  return {
    items: state.product.cart
  }
}

const mapDispatchToProps = dispatch => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Cart)
