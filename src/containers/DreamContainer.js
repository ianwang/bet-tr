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

  _getBettingResult = () => {
    let { dreams, user } = this.props
    let deposite = this._getDream().get('deposite')
    let bettings = dreams.get('bettings')
    let positive = dreams.getIn(['result', 'positive'])
    let yourBet = bettings.find(b => b.get('userEmail') === user.get('email'))

    if (!yourBet) {
      return 0
    }
    let yourBettingAmount = yourBet.get('amount')
    let youWin = positive === yourBet.get('positive')

    let positiveBets = bettings.filter(b => b.get('positive'))
    let negativeBets = bettings.filter(b => !b.get('positive'))

    let positivePool = positiveBets.reduce((a, b) => a + b.get('amount'), 0)
    let negaticePool = negativeBets.reduce((a, b) => a + b.get('amount'), 0)

    if (positive) {
      if (youWin) {
        return negaticePool/ positiveBets.size
      } else {
        return -yourBettingAmount
      }
    } else {
      if (youWin) {
        return (positivePool + deposite) / negativeBets.size
      } else {
        return -yourBettingAmount
      }
    }
  }

  _renderYourBettingResult = () => {
    let net = this._getBettingResult()
    if (net === 0) {
      return null
    }
    return (
      <div>
        {
          net > 0 ? `You win $${net}` : `You lose $${net * -1}`
        }
        <style jsx>{`
          color: ${net > 0 ? 'green' : 'red'};
        `}
        </style>
      </div>

    )
  }
  render () {
    let { dreams } = this.props
    let bettings = dreams.get('bettings')
    let dream = this._getDream()
    let result = dreams.get('result')

    return !!dream ? (
      <div className='dream-show'>
        <header>
          <a href='/' className='icon-back'></a>
          <span className='page-title'>Dreams</span>
        </header>
        <div className='page-cover'></div>
        <div className='detail'>
          <div className='meta'>
            <span className='dreamer'>Weiting</span>
            <span className='created-at'>Sep 12, 2018 22:10:08</span>
          </div>
          <h1>Fastest watermelon eater in Codementor</h1>
          <div className='finished-at'>
            Ending in 7 minutes
          </div>
          <div className='state-action'>
            <div className='info'>
              <div className='item'>
                <span className='label'>Stake</span>
                <span className='value'>
                  ${ dream.get('deposite') }
                </span>
              </div>
              <div className='item'>
                <span className='label'>Betting pool</span>
                <span className='value'>
                  { bettings.reduce((a, b) => a + b.get('amount'), 0) }
                </span>
              </div>
              <div className='item'>
                <span className='label'>Status/Result</span>
                <span className='value'>
                  {
                    !result.isEmpty() ? (
                      result.get('positive') ? 'Success' : 'Failure'
                    ) : 'Ongoing'
                  }
                </span>
              </div>
              <div className='item'>
                <span className='label'>Your net gain</span>
                <span className='value'>
                  { this._renderYourBettingResult() }
                </span>
              </div>
            </div>
            <div className='bet'>
              <TextField
                required
                fullWidth
                type='number'
                label='Amount you want to bet'
                onChange={this._updateAmount} />
              <div className='btns'>
                <Button
                  onClick={this._bet(true)}
                  variant='contained'
                  color='primary'>
                  yes
                </Button>
                <Button
                  onClick={this._bet(false)}
                  variant='contained'
                  color='secondary'>
                  no
                </Button>
              </div>
            </div>
          </div>
          <label className='investors'>Investors</label>
          <div className='bettrs'>
            {
              bettings.map(b => {
                return (
                  <div className='bettr' key={b.get('userEmail')}>
                    <div className='bet-info'>
                      <div className='bet-what'>
                        { b.get('positive') ? 'YES' : 'NO' }
                      </div>
                      <div className='nickname'>{ b.get('userEmail') }</div>
                    </div>
                    <div className='bet-amount'>${ b.get('amount') }</div>
                  </div>
                )
              })
            }
          </div>
        </div>

        <style jsx>{`
          .bet-info .nickname{
            font-size: 12px;
            color: #B0B0B0;
            margin: 5px 0 20px;
          }
          .bettr{
            margin-top: 20px;
            color: #fff;
            display: flex;
            align-items: center;
            justify-content: space-between;
            border-bottom: 1px solid rgba(255,255,255,0.2);
          }
          label.investors{
            margin-top: 20px;
            color: #FFFFFF;
            font-size: 12px;
          }
          .btns{
            flex: 1;
          }
          .state-action button {
            width: 50px;
            height: 34px;
            box-sizing: border-box;
            border-radius: 3px;
            background: #FFE018;
            border: 0px;
            margin-left: 7px;
          }
          .state-action .bet form{
            display: flex;
            align-items: center;
          }
          .state-action .bet{
            margin-top: 15px;
          }

          .bet, .btns {
            display: flex;
          }
          .state-action .bet input{
            border: 1px solid #E0E0E0;
            border-radius: 2px;
            padding: 5px 10px;
            box-sizing: border-box;
            font-size: 14px;
            height: 34px;
            margin-right: 5px;
            width: calc(100% - 120px);;
          }
          .state-action .info .item .value{
            color: #010311;
            display: block;
            font-size: 16px;
          }
          .state-action .info .item .label{
            color: #F07062;
            display: block;
            margin-bottom: 10px;
            font-size: 14px;
          }

          .state-action .info{
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .state-action{
            padding: 13px 18px;
            background: #fff;
            border-radius: 3px;
            width: 100%;
            margin: 22px 0 15px;
            box-sizing: border-box;
          }
          .finished-at{
            color: #888;
            font-size: 12px;
          }
          .detail{
            padding: 15px 20px;
          }
          .meta{
            height: 26px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: #B0B0B0;
            font-size: 12px;
          }
          .detail h1{
            color: #fff;
            margin: 10px 0 7px 0;
            line-height: 1.3;
            font-size: 30px;
          }
          :global(body) {
            background: #010311;
            font-family: 'Comfortaa', cursive;
            margin: 0px;
            padding: 0px;
          }
          header{
            height: 48px;
            display: flex;
            align-items: center;
            justify-content: left;
            box-sizing: border-box;
            padding: 9px 5px;
          }
          .icon-back{
            background: url('/static/back.png') no-repeat 50% 50%;
            width: 30px;
            height: 30px;
            display: inline-block;
          }
          .page-title{
            display: inline-block;
            line-height: 36px;
            margin-top: 4px;
            color: #fff;
          }
          .page-cover{
            background-image: url('https://swampscottfarmersmarketblog.files.wordpress.com/2014/07/sfm_watermeloneating2014.jpg');
            background-repeat: no-repeat;
            background-size: cover;
            width: 100%;
            height: 200px;
          }
        `}</style>
      </div>
    ) : 'Loading...'
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
