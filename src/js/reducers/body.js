import createReducer from './utilities'
import {TOGGLE_DRAWER, TOOGLE_FETCHING} from '../actions/types'

// Case Reducers
const toggleDrawer = (state, action) => !state
const toggleFetching = (state, action) => !state

// Slice Reducers
export const openDrawer = createReducer(false, {
	TOGGLE_DRAWER: toggleDrawer
})
export const isFetching = createReducer(false, {
	TOGGLE_FETCHING: toggleFetching
})
