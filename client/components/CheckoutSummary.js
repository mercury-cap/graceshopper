import React from 'react'

const CheckoutSummary = ({items, subtotal, tax, shipping}) => {
  return (
    <table id="checkout-items">
      <tbody>
        {items.map(item => (
          <tr id="checkout-single-item" key={item.id}>
            <td>
              {item.name} ({item.order_items.quantity})
            </td>
            <td>
              ${(item.price * item.order_items.quantity / 100).toFixed(2)}
            </td>
          </tr>
        ))}
        <tr>
          <td>
            <b>Subtotal</b>
          </td>
          <td>
            <h4>${(subtotal / 100).toFixed(2)}</h4>
          </td>
        </tr>
        <tr>
          <td>Shipping & Handling</td>
          <td>${(shipping / 100).toFixed(2)}</td>
        </tr>
        <tr>
          <td>Tax</td>
          <td>${(tax / 100).toFixed(2)}</td>
        </tr>
        <tr>
          <td>
            <h3>Order Total</h3>
          </td>
          <td>
            <h3>${((subtotal + shipping + tax) / 100).toFixed(2)}</h3>
          </td>
        </tr>
      </tbody>
    </table>
  )
}

export default CheckoutSummary
