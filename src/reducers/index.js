import { combineReducers } from 'redux'

import user from './user'
import dreams from './dreams'

export default combineReducers({
  user,
  dreams
})
