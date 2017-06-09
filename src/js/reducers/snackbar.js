import createReducer from './utilities'
import {SET_SNACKBAR_MESSAGE} from '../actions/types'

// Case Reducers
function setSnackbarMessage(state, action) {
	return action.msg
}

// Slice Reducers
const snackbarMessage = createReducer('dummy message', {
	SET_SNACKBAR_MESSAGE: setSnackbarMessage
})

export default snackbarMessage
