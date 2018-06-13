import createReducer, {addByKeyToObject, removeByKeyFromObject} from "./utilities"
import {
	ADD_SNACKBAR, 
	REMOVE_SNACKBAR
} from "../actions/types"

// Slice Reducers
const snackbars = createReducer({}, {
	ADD_SNACKBAR: addByKeyToObject, 
	REMOVE_SNACKBAR: removeByKeyFromObject
})

export default snackbars
