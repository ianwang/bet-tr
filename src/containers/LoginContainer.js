import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'

import { createUser } from 'actions/user'

class LoginContainer extends Component {
  state = {
    email: ''
  }
  render () {
    return (
      <div>
        <header>
          <h1>Bet.tr</h1>
          <h2>Make bets on a better you</h2>
        </header>
        
        <div className="home-cover">
          <img width="300" src="https://cdn.dribbble.com/users/754899/screenshots/3662293/fantasy_antelope.gif"/>
        </div>
        <form className="login-form" onSubmit={this._createUser}>
          <TextField
            required
            type='email'
            label='Enter your email'
            className='login-input'
            onChange={this._updateUserName} />
          
          <Button
            variant='contained'
            className='login-button'
            color='primary'
            size='large'
            type='submit'>
            Create a new wallet
          </Button>
        </form>
        <style jsx>{`
        .login-form{
          text-align: center;
        }
        :global(.login-input){
          display: flex;
          margin: 0 auto 20px;
          width: 232px;
          border: 1px solid #E0E0E0;
          border-radius: 2px;
          background: #fff;
        }
        :global(.login-input input){

        }
        :global(.login-button){
          font-family: 'Comfortaa', cursive;
          background: #FFE018;
          color: #010311;
        }
        header{
          text-align: center;
        }
        header h1{
          font-size: 60px;
          margin-bottom: 10px;
        }
        header h2{
          font-size: 16px;
          font-weight: normal;
        }
        .home-cover{
          text-align: center;
        }
        :global(body) {
          background: #010311;
          font-family: 'Comfortaa', cursive;
          margin: 0px;
          padding: 0px;
          color: #fff;
        }
        `}</style>
      </div>
    )
  }
  _updateUserName = (e) => {
    let { value } = e.target
    this.setState({
      email: value
    })
  }

  _createUser = (e) => {
    let { createUser } = this.props
    let { email } = this.state
    e.preventDefault()
    if (email) {
      createUser({
        email: email.trim()
      })
    }
  }
}

function mapStateToProps (state) {
  return {
  }
}

LoginContainer.propTypes = {
  createUser: PropTypes.func.isRequired
}

export { LoginContainer }
export default connect(mapStateToProps, {
  createUser
})(LoginContainer)
