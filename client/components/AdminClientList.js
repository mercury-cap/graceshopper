import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllUsers} from '../store/user'

class AdminClientList extends Component {
  componentDidMount() {
    this.props.getAllUsers()
  }

  render() {
    let users = this.props.user || []

    console.log(users)

    const userList = users.length ? (
      users.map(user => {
        return <div key={user.email}>HEY HEY</div>
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
    user: state.user.user
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllUsers: () => dispatch(getAllUsers())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminClientList)
