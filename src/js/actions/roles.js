import makeActionCreator from "./creator"
import {
	ROLES_REQUEST, 
	ROLES_SUCCESS, 
	ROLES_FAILURE, 
	ROLEIDS_SELECTED_BY_KEY_SET, 
	ROLEIDS_SELECTED_BY_KEY_REMOVE
} from "./types"

// Action Creators
export const rolesRequest = makeActionCreator(
	ROLES_REQUEST
)
export const rolesSuccess = makeActionCreator(
	ROLES_SUCCESS
)
export const rolesFailure = makeActionCreator(
	ROLES_FAILURE
)
export const roleIDsSelectedByKeySet = makeActionCreator(
	ROLEIDS_SELECTED_BY_KEY_SET, 
	"data"
)
export const roleIDsSelectedByKeyRemove = makeActionCreator(
	ROLEIDS_SELECTED_BY_KEY_REMOVE, 
	"key"
)
