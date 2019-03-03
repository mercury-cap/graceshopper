import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {getCartItems} from '../store/product'

class Navbar extends Component {
  componentDidMount() {
    this.props.getCartItems()
  }

  render() {
    const {handleClick, isLoggedIn, cart} = this.props
    return (
      <div>
        <nav>
          <div className="nav-wrapper black">
            <Link to="/" className="brand-logo black">
              🔥HOT 'N' SAUCEY🔥
            </Link>
            {isLoggedIn ? (
              <ul id="nav-mobile" className="right hide-on-med-and-down black">
                {/* The navbar will show these links after you log in */}
                <li>
                  <Link to="/home">
                    <i className="material-icons prefix">person</i>
                  </Link>
                </li>
                <li>
                  <a href="#" onClick={handleClick}>
                    Logout
                  </a>
                </li>
                <li>
                  <Link to="/cart">
                    <i className="material-icons prefix">shopping_cart</i>
                  </Link>
                </li>
              </ul>
            ) : (
              <ul id="nav-mobile" className="right hide-on-med-and-down black">
                {/* The navbar will show these links before you log in */}
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/signup">Sign Up</Link>
                </li>
                <li>
                  <Link to="/cart">
                    <i className="material-icons prefix">shopping_cart</i>
                  </Link>
                </li>
                <li>
                  <span>{cart.length}</span>
                </li>
              </ul>
            )}
          </div>
        </nav>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    cart: state.product.cart
  }
}

const mapDispatch = dispatch => ({
  handleClick() {
    dispatch(logout())
  },
  getCartItems() {
    dispatch(getCartItems())
  }
})

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
