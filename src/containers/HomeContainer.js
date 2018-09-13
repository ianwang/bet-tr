import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { checkUser } from 'actions/user'

class HomeContainer extends Component {
  static async getInitialProps ({ store }) {
  }
  componentDidMount () {
    this.props.checkUser()
  }

  render () {
    let { user } = this.props
    return (
      <div>
        { user.get('email') }
        <section>
          coin
        </section>
        <section className='list'>
          list
        </section>
        <section className='bottom'>
          nav

        </section>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    user: state.user
  }
}

HomeContainer.propTypes = {
  user: PropTypes.instanceOf(Map).isRequired,
  checkUser: PropTypes.func.isRequired
}

export { HomeContainer }
export default connect(mapStateToProps, {
  checkUser
})(HomeContainer)
