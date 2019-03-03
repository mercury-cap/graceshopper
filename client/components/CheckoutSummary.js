import React from 'react'
import CheckoutForm from './CheckoutForm'

const CheckoutSummary = ({items, subtotal, tax, shipping}) => {
  return (
    <div className="container">
      <div className="divider" />
      <div className="section">
        <div className="row">
          <div className="col s12">
            <h4>Order Summary</h4>
          </div>
          <div className="col s7">
            <h5>Items</h5>
            <table>
              <tbody>
                {items.map(item => (
                  <tr id="checkout-single-item" key={item.id}>
                    <td>
                      {item.name} ({item.order_items.quantity})
                    </td>
                    <td>
                      ${(item.price * item.order_items.quantity / 100).toFixed(
                        2
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h5>Subtotal</h5>
            <p>${(subtotal / 100).toFixed(2)}</p>
          </div>
          <div className="col s5">
            <h5>Shipping & Tax</h5>
            <p>Shipping: ${(shipping / 100).toFixed(2)}</p>
            <p>Estimated tax: ${(tax / 100).toFixed(2)}</p>
          </div>
        </div>
      </div>
      <div className="divider" />
      <div className="section">
        <div className="row">
          <div className="col s10 orange-text">
            <h4>Order Total</h4>
          </div>
          <div className="col s2 orange-text">
            <h4>${((subtotal + shipping + tax) / 100).toFixed(2)}</h4>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutSummary
