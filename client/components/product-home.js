import React, {Component} from 'react'
import {connect} from 'react-redux'

class ProductHome extends Component {
  componentDidMount() {
    document.addEventListener('DOMContentLoaded', function() {
      const elems = document.querySelectorAll('.slider')
      const instances = M.Slider.init(elems)
    })
  }

  render() {
    return (
      <div className="slider">
        <ul className="slides">
          <li>
            <img src="https://timedotcom.files.wordpress.com/2014/01/181179514.jpg" />
            <div className="caption center-align">
              <h3>We have Sriracha (obviously)!</h3>
              <h5 className="light grey-text text-lighten-3">
                Hot sauces from Thailand
              </h5>
            </div>
          </li>
          <li>
            <img src="https://www.mexicanplease.com/wp-content/uploads/2015/12/four-mexican-hot-sauces-you-should-know.jpg" />
            <div className="caption center-align">
              <h3>Muy Picante!</h3>
              <h5 className="light grey-text text-lighten-3">
                Hot sauces from Mexico
              </h5>
            </div>
          </li>
          <li>
            <img src="https://lorempixel.com/580/250/nature/3" />
            <div className="caption center-align">
              <h3>Right Aligned Caption</h3>
              <h5 className="light grey-text text-lighten-3">
                Here's our small slogan.
              </h5>
            </div>
          </li>
        </ul>
      </div>
    )
  }
}

const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(ProductHome)
