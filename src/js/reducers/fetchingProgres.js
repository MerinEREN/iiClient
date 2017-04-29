import createReducer from './utilities'
import {TOOGLE_FETCHING} from '../actions/types'

// Case Reducers
const toggleFetching = (state, action) => !state

// Slice Reducers
export const isFetching = createReducer(false, {
	TOGGLE_FETCHING: toggleFetching
})
