import createReducer from "./utilities"
import {
	FETCHING_TOGGLE
} from "../actions/types"

// Case Reducers
const fetchingToggle = (state, action) => !state

// Slice Reducers
const isFetching = createReducer(false, {
	FETCHING_TOGGLE: fetchingToggle
})

export default isFetching
