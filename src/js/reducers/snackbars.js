import createReducer, {
	addToAnObjectWithKey, 
	removeFromAnObjectByKey
} from "./utilities"
import {
	SNACKBAR_ADD, 
	SNACKBAR_REMOVE
} from "../actions/types"

// Slice Reducers
const snackbars = createReducer({}, {
	SNACKBAR_ADD: addToAnObjectWithKey, 
	SNACKBAR_REMOVE: removeFromAnObjectByKey
})

export default snackbars
