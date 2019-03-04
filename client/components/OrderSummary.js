import React from 'react'

const OrderSummary = props => {
  return (
    <div className="container center-align">
      <div className="row">
        <h2 className="orange-text">Thank you for your order!</h2>
        <div className="row">
          <p>Here is your order # for your reference:</p>
          <p>Order #{props.match.params.cartId}</p>
        </div>
      </div>
    <div>
  )
}

export default OrderSummary
