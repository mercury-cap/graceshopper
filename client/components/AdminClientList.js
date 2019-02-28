import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllUsers} from '../store/user'

class AdminClientList extends Component {
  componentDidMount() {
    this.props.getAllUsers()
  }

  render() {
    let users = this.props.user || []

    const userList = users.length ? (
      users.map(user => {
        return (
          <div key={user.id}>
            <div>
              {' '}
              {user.firstName} {user.lastName}{' '}
            </div>
            <p>{user.email}</p>
            <p>{user.shippingState}</p>
          </div>
        )
      })
    ) : (
      <div>
        <div>Sorry no client.</div>
      </div>
    )

    return (
      <div>
        <h1>Our amazing clients</h1>
        <span>{userList}</span>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    user: state.user.users
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllUsers: () => dispatch(getAllUsers())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminClientList)
