import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {me} from '../store/user'

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

  componentDidMount() {
    this.props.me()
  }

  render() {
    let {user} = this.props
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
                      value={user.firstName}
                      name="firstName"
                      type="text"
                      id="firstName"
                      required="required"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s6">
                    <input
                      value={user.lastName}
                      name="lastName"
                      type="text"
                      id="lastName"
                      required="required"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s6">
                    <input
                      value={user.shippingAddress}
                      name="shippingAddress"
                      type="text"
                      id="shippingAddress"
                      required="required"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s6">
                    <input
                      value={user.shippingCity}
                      name="shippingCity"
                      type="text"
                      id="shippingCity"
                      required="required"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s6">
                    <input
                      value={user.shippingState}
                      name="shippingState"
                      type="text"
                      id="shippingState"
                      required="required"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s6">
                    <input
                      value={user.shippingZip}
                      name="shippingZip"
                      type="text"
                      id="shippingZip"
                      required="required"
                    />
                  </div>
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

const mapDispatchToProps = dispatch => {
  return {
    me: () => dispatch(me())
  }
}

export default connect(mapState, mapDispatchToProps)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
