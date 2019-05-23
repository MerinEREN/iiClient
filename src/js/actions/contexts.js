import makeActionCreator from "./creator"
import {
	CONTEXTS_REQUEST, 
	CONTEXTS_SUCCESS, 
	CONTEXTS_FAILURE, 
	CONTEXTS_RESET_ALL, 
	CONTEXTIDS_SELECTED_ADD_REMOVE
} from "./types"

// Action Creators
export const contextsRequest = makeActionCreator(
	CONTEXTS_REQUEST
)
export const contextsSuccess = makeActionCreator(
	CONTEXTS_SUCCESS
)
export const contextsFailure = makeActionCreator(
	CONTEXTS_FAILURE
)
export const contextsResetAll = makeActionCreator(
	CONTEXTS_RESET_ALL
)
export const selectedContextIDsAddRemove = makeActionCreator(
	CONTEXTIDS_SELECTED_ADD_REMOVE, 
	"ID"
)
