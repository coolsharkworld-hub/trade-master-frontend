import { combineReducers } from '@reduxjs/toolkit'

import auth from './auth'
import cart from './cart'

const reducer = combineReducers({
  auth,
  cart
})

export default reducer
