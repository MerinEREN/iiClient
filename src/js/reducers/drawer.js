import createReducer from './utilities'
import {TOGGLE_DRAWER} from '../actions/types'

// Case Reducers
const toggleDrawer = (state, action) => !state

// Slice Reducers
export const openDrawer = createReducer(false, {
	TOGGLE_DRAWER: toggleDrawer
})
