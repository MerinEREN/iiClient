import createReducer from './utilities'
import {SET_ERROR_MESSAGE} from '../actions/types'

// Case Reducers
function setErrorMessage(state, action) {
	return action.error
}

// Slice Reducers
const errorMessage = createReducer(null, {
	SET_ERROR_MESSAGE: setErrorMessage
})

export default errorMessage
