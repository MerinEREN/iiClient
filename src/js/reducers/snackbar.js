import createReducer from './utilities'
import {SET_SNACKBAR} from '../actions/types'

// Case Reducers
function setSnackbar(state, action) {
	return action.props
}

// Slice Reducers
const snackbar = createReducer({}, {
	SET_SNACKBAR: setSnackbar
})

export default snackbar
