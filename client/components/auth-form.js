import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {auth, authSignup} from '../store'

/**
 * COMPONENT
 */
const AuthForm = props => {
  const {
    name,
    displayName,
    handleSignupSubmit,
    handleLoginSubmit,
    error
  } = props

  return (
    <div className="container">
      <div className="row">
        {displayName === 'Sign Up' ? (
          <form onSubmit={handleSignupSubmit} name={name}>
            <div>
              <div className="row">
                <div className="input-field col s6">
                  <input
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
            <div className="row">
              <div className="col s3 orange-text">
                <button
                  className="waves-effect waves-light amber darken-4 btn"
                  type="submit"
                >
                  {displayName}
                </button>
                {error && error.response && <div> {error.response.data} </div>}
              </div>
              <div className="col s3 orange-text">
                <button
                  type="submit"
                  className="waves-effect waves-light amber darken-4 btn"
                >
                  <div>
                    <a href="/auth/google">{displayName} with Google</a>
                  </div>
                </button>
              </div>
            </div>
          </form>
        ) : (
          <form onSubmit={handleLoginSubmit} name={name}>
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

            <div className="row">
              <div className="col s3 orange-text">
                <button
                  className="waves-effect waves-light amber darken-4 btn"
                  type="submit"
                >
                  {displayName}
                </button>
                {error && error.response && <div> {error.response.data} </div>}
              </div>
              <div className="col s3 orange-text">
                <button
                  type="submit"
                  className="waves-effect waves-light amber darken-4 btn"
                >
                  <div>
                    <a href="/auth/google">{displayName} with Google</a>
                  </div>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSignupSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      const firstName = evt.target.firstName.value
      const lastName = evt.target.lastName.value
      const shippingAddress = evt.target.shippingAddress.value
      const shippingCity = evt.target.shippingCity.value
      const shippingState = evt.target.shippingState.value
      const shippingZip = evt.target.shippingZip.value
      dispatch(
        authSignup(
          email,
          password,
          formName,
          firstName,
          lastName,
          shippingAddress,
          shippingCity,
          shippingState,
          shippingZip
        )
      )
    },
    handleLoginSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSignupSubmit: PropTypes.func.isRequired,
  handleLoginSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
