import Immutable from 'immutable'
import * as ActionType from 'actions/dreams'

export const initialState = Immutable.fromJS({
  list: [],
  bettings: [],
  bettingsLoaded: false
})

export default function (state = initialState, action) {
  switch (action.type) {
    case ActionType.GET_ALL_DREAMS:
      return state.merge({
        list: action.dreams
      })

    case ActionType.GET_DREAM_BETTINGS:
      return state.set('bettings', Immutable.fromJS(action.response))
        .set('bettingsLoaded', true)

    default:
      return state
  }
}
