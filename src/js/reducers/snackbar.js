import createReducer from './utilities'
import {SET_SNACKBAR, RESET_SNACKBAR} from '../actions/types'

// Case Reducers
function setSnackbar(state, action) {
	return action.props
}
function resetSnackbar(state, action) {
	return {}
}

// Slice Reducers
const snackbar = createReducer({}, {
	SET_SNACKBAR: setSnackbar, 
	RESET_SNACKBAR: resetSnackbar
})

export default snackbar
