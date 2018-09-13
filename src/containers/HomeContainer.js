import React, { Component } from 'react'
import { Map, List } from 'immutable'
import PropTypes from 'prop-types'
import { Link } from '../../routes'

import { connect } from 'react-redux'
import { checkUser } from 'actions/user'
import { getAllDreams } from 'actions/dreams'

class HomeContainer extends Component {
  componentDidMount () {
    this.props.checkUser()
    this.props.getAllDreams()
  }

  render () {
    let { user, dreams } = this.props
    return (
      <div>
        { user.get('email') }
        <section>
          coin
        </section>
        <section className='list'>
          {
            dreams.map(d => {
              let id = d.get('randomKey')
              return (
                <Link key={id} route={`/dreams/${id}`}>
                  { d.get('title') }
                </Link>
              )
            })
          }
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
    user: state.user,
    dreams: state.dreams.get('list')
  }
}

HomeContainer.propTypes = {
  user: PropTypes.instanceOf(Map).isRequired,
  dreams: PropTypes.instanceOf(List).isRequired,
  checkUser: PropTypes.func.isRequired,
  getAllDreams: PropTypes.func.isRequired
}

export { HomeContainer }
export default connect(mapStateToProps, {
  checkUser,
  getAllDreams
})(HomeContainer)
