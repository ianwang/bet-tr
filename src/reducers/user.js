import Immutable from 'immutable'
import * as ActionType from 'actions/user'

export const initialState = Immutable.fromJS({
  isSigning: false,
  email: ''
})

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionType.CREATE_USER:
      return state.set('email', action.email)
        .set('balance', action.balance)

    default:
      return state
  }
}
