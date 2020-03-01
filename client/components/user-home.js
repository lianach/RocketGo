import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
export const UserHome = props => {
  const { email } = props

  return (
    <div style={{ marginTop: '100px' }}>
      <h3 style={{ color: "black" }}>Welcome, {email}</h3>

      <div style={{

        display: 'flex',
        justifyContent: 'center',

        alignContent: 'space-around'


      }}>


        <div style={{ margin: '10px' }}>
          <img src={`https://66.media.tumblr.com/ae5a0f908843eb40c59f4df7b2c15e48/tumblr_p0cfpdmcC11sqhy0go1_500.jpg`} alt="investor" width="350" height="350" />
          <p>Investment Profitability</p>
          <div className="container1">
            <div className="percentage num1">80%</div>
          </div>
          <p>Rate of Return</p>
          <div className="container2">
            <div className="percentage num2"> 76%</div>
          </div>


        </div>
        <br />

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignContent: 'center'
        }}>
          <h1>My stocks</h1>
          <div id="one">

            <br />
            <br />
          </div>
          <div id="two">
            <Link to={'/AAPL'} style={{ textDecoration: 'none', color: 'white' }}> Apple </Link>
            <br />
            <br />
          </div>
          <div id="three">
            <Link to={'/MSFT'} style={{ textDecoration: 'none', color: 'white' }}> Microsoft </Link>
            <br />
            <br />
          </div>
          <div id="four" >
            <Link style={{ textDecoration: 'none', color: 'white' }} to={'/GS'}> Goldman Sachs</Link>
            <br />
            <br />
          </div>
          <div id="five">
            <Link to={'/JPM'} style={{ textDecoration: 'none', color: 'white' }}>  {'JP Morgan Chase & Co.'}</Link>
            <br />
            <br />
          </div>
        </div>

      </div>
    </div>
  )
}


const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

