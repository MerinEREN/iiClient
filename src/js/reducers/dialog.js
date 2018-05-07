import createReducer from './utilities'
import {SET_DIALOG, RESET_DIALOG} from '../actions/types'

// Case Reducers
function setDialog(state, action) {
	return action.props
}
function resetDialog(state, action) {
	return {}
}

// Slice Reducers
const dialog = createReducer({}, {
	SET_DIALOG: setDialog, 
	RESET_DIALOG: resetDialog
})

export default dialog

