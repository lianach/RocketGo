import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'

const Navbar = ({ handleClick, isLoggedIn }) => (
  <div>

    <nav >
      <h1 style={{ fontFamily: 'Quicksand' }}>RocketGo</h1>
      {isLoggedIn ? (
        <div className='items'>
          {/* The navbar will show these links after you log in */}
          <Link to="/home">Home</Link>
          <a style={{ fontFamily: 'Quicksand' }} href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
          <div style={{ fontFamily: 'Quicksand' }} className='items'>
            {/* The navbar will show these links before you log in */}
            <Link style={{ fontFamily: 'Quicksand' }} to="/login">Login</Link>

          </div>
        )}
    </nav>

  </div>
)

const mapState = state => {
  return {
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)
