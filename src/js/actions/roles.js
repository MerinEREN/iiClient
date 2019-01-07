import makeActionCreator from "./creator"
import {
	ROLES_REQUEST, 
	ROLES_SUCCESS, 
	ROLES_FAILURE, 
	ROLEIDS_SELECTED_BY_USER_SET, 
	ROLEIDS_SELECTED_BY_USER_REMOVE
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
export const roleIDsSelectedByUserSet = makeActionCreator(
	ROLEIDS_SELECTED_BY_USER_SET, 
	"key", 
	"value"
)
export const roleIDsSelectedByUserRemove = makeActionCreator(
	ROLEIDS_SELECTED_BY_USER_REMOVE, 
	"key"
)
