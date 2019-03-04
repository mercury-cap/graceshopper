import React from 'react'

const OrderSummary = props => {
  return (
    <div>
      <h1>Thank you for your order!</h1>
      <p>Here is your order # for your reference:</p>
      <p>Order #{props.match.params.cartId}</p>
    </div>
  )
}

export default OrderSummary
