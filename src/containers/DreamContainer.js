import React, { Component, Fragment } from 'react'
import { Map, List } from 'immutable'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { checkUser } from 'actions/user'
import {
  getAllDreams,
  getDreamBettings,
  getDreamResult,
  createResult,
  betOnDream } from 'actions/dreams'

class DreamContainer extends Component {
  componentDidMount () {
    let dreamId = this._getId()
    this.props.checkUser()
    this.props.getAllDreams()
    this.props.getDreamBettings({ dreamId })
    this.props.getDreamResult({ dreamId })
    window.createResult = (positive) => {
      this.props.createResult({ dreamId, positive })
    }
  }

  render () {
    let { dreams } = this.props
    let bettings = dreams.get('bettings')
    let dream = this._getDream()
    return !!dream ? (
      <div>
        { dream.get('title') }
        <h3>will it success?</h3>
        {
          this._notBetYet() && this._renderBetButtons()
        }
        <section className='bettings'>
          {
            bettings.map(b => {
              return (
                <div key={b.get('userEmail')}>
                  { b.get('userEmail') } -
                  { `$${b.get('amount')}` } -
                  { b.get('positive') ? 'yes' : 'no' }
                </div>
              )
            })
          }
        </section>
      </div>
    ) : (
      <div>
        not found
      </div>
    )
  }

  _notBetYet = () => {
    let { user, dreams } = this.props
    if (!dreams.get('bettingsLoaded')) {
      return false
    }
    return !dreams.get('bettings').some(b => (
      b.get('userEmail') === user.get('email')
    ))
  }

  _renderBetButtons = () => {
    return (
      <Fragment>
        <TextField
          required
          type='number'
          label='amount'
          onChange={this._updateAmount} />
        <Button
          onClick={this._bet(true)}
          variant='contained'
          color='primary'
          size='large'>
          yes
        </Button>
        <Button
          onClick={this._bet(false)}
          variant='contained'
          color='secondary'
          size='large'>
          no
        </Button>
      </Fragment>
    )
  }
  _updateAmount = e => {
    this.setState({
      amount: Number(e.target.value)
    })
  }
  _bet = (positive) => {
    return () => {
      let { betOnDream, user } = this.props
      let { amount } = this.state
      if (!amount) {
        return alert('You must enter an amount')
      }
      betOnDream({
        dreamId: this._getId(),
        userEmail: user.get('email'),
        amount,
        positive
      })
    }
  }

  _getDream = () => {
    let { dreams } = this.props
    let id = this._getId()
    return dreams.get('list').find(d => d.get('randomKey') === id)
  }
  _getId = () => {
    let { url: { query: { id } } } = this.props
    return id
  }
}

function mapStateToProps (state) {
  return {
    user: state.user,
    dreams: state.dreams
  }
}

DreamContainer.propTypes = {
  dreams: PropTypes.instanceOf(Map).isRequired,
  user: PropTypes.instanceOf(Map).isRequired,
  checkUser: PropTypes.func.isRequired,
  betOnDream: PropTypes.func.isRequired,
  getDreamBettings: PropTypes.func.isRequired,
  createResult: PropTypes.func.isRequired,
  getDreamResult: PropTypes.func.isRequired,
  getAllDreams: PropTypes.func.isRequired
}

export { DreamContainer }
export default connect(mapStateToProps, {
  checkUser,
  betOnDream,
  createResult,
  getDreamBettings,
  getDreamResult,
  getAllDreams
})(DreamContainer)
