/* eslint-disable react/no-deprecated */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {me, editUser} from '../store/user'

/**
 * COMPONENT
 */
export class UserHome extends Component {
  constructor(props) {
    super(props)

    this.state = {
      firstName: '',
      lastName: '',
      shippingAddress: '',
      shippingCity: '',
      shippingState: '',
      shippingZip: ''
    }
  }

  componentDidMount = async () => {
    await this.props.me()
    const userInfo = this.props.user

    this.setState(userInfo)
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  handleSubmit = event => {
    event.preventDefault()
    this.props.editUser(this.props.user.id, this.state)
  }

  render() {
    const {email} = this.props
    let {user} = this.props
    return (
      <div className="container">
        <h3>Welcome!</h3>

        <div className="row">
          <form name={name} onSubmit={this.handleSubmit}>
            <div>
              <div className="row">
                <div className="input-field col s6">
                  <input
                    value={this.state.firstName}
                    className="autocomplete"
                    type="text"
                    id="firstName"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="input-field col s6">
                  <input
                    value={this.state.lastName}
                    className="autocomplete"
                    type="text"
                    id="lastName"
                    required="required"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="input-field col s6">
                  <input
                    value={this.state.shippingAddress}
                    className="autocomplete"
                    type="text"
                    id="shippingAddress"
                    required="required"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="input-field col s6">
                  <input
                    value={this.state.shippingCity}
                    className="autocomplete"
                    type="text"
                    id="shippingCity"
                    required="required"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="input-field col s6">
                  <input
                    value={this.state.shippingState}
                    className="autocomplete"
                    type="text"
                    id="shippingState"
                    required="required"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="input-field col s6">
                  <input
                    value={this.state.shippingZip}
                    className="autocomplete"
                    type="text"
                    id="shippingZip"
                    required="required"
                    onChange={this.handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="col s3 orange-text">
              <button
                type="submit"
                className="waves-effect waves-light amber darken-4 btn"
              >
                Update
              </button>
            </div>
          </form>
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
    me: () => dispatch(me()),
    editUser: (id, updatedUser) => dispatch(editUser(id, updatedUser))
  }
}

export default connect(mapState, mapDispatchToProps)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
