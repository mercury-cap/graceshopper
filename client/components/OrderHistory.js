import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getOrders} from '../store/product'

class OrderHistory extends Component {
  state = {}
  render() {
    console.log(this.props)
    return (
      <div>
        <p>Hi!</p>
      </div>
    )
  }
}

const mapStateToProps = state => {}

export default OrderHistory
