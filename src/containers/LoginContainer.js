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
      <form onSubmit={this._createUser}>
        <TextField
          required
          type='email'
          label='email'
          onChange={this._updateUserName} />
        <Button
          variant='contained'
          color='primary'
          size='large'
          type='submit'>
          Create a new wallet
        </Button>
      </form>
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
