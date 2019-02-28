import React, {Component} from 'react'
import {connect} from 'react-redux'

class Checkout extends Component {
  constructor() {
    super()
    this.state = {}
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick = () => {
    console.log('HELLOOO BUTTON')
  }

  render() {
    console.log(this.props.items)
    return (
      <div>
        <h1>ORDER SUMMARY</h1>
        {this.props.items.map(item => <p key={item.name}>{item.name}</p>)}

        <button type="submit" onClick={this.handleClick}>
          Place Your Order
        </button>
      </div>
    )
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

export default connect(mapStateToProps, mapDispatchToProps)(Checkout)
