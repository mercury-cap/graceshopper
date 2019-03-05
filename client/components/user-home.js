import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export class UserHome extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: {}
    }
  }

  render() {
    return (
      <div>
        <h3>Welcome!</h3>
        <div className="container">
          <div className="row">
            <form name={name}>
              <div>
                <div className="row">
                  <div className="input-field col s6">
                    <input
                      value=""
                      name="firstName"
                      type="text"
                      id="firstName"
                      required="required"
                    />
                    <label htmlFor="firstName">First Name</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s6">
                    <input
                      name="lastName"
                      type="text"
                      id="lastName"
                      required="required"
                    />
                    <label htmlFor="lastName">Last Name</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s6">
                    <input
                      name="shippingAddress"
                      type="text"
                      id="shippingAddress"
                      required="required"
                    />
                    <label htmlFor="shippingAddress">Address</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s6">
                    <input
                      name="shippingCity"
                      type="text"
                      id="shippingCity"
                      required="required"
                    />
                    <label htmlFor="shippingCity">City</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s6">
                    <input
                      name="shippingState"
                      type="text"
                      id="shippingState"
                      required="required"
                    />
                    <label htmlFor="shippingState">State</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s6">
                    <input
                      name="shippingZip"
                      type="text"
                      id="shippingZip"
                      required="required"
                    />
                    <label htmlFor="shippingZip">Zip Code</label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s6">
                  <input
                    name="email"
                    type="email"
                    id="email"
                    required="required"
                    className="validate"
                  />
                  <label htmlFor="email">Email</label>
                </div>
              </div>
              <div className="row">
                <div className="input-field col s6">
                  <input
                    name="password"
                    type="password"
                    id="password"
                    required="required"
                  />
                  <label htmlFor="password">Password</label>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
