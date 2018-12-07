import makeActionCreator from "./creator"
import {
	ROLES_REQUEST, 
	ROLES_SUCCESS, 
	ROLES_FAILURE, 
	ROLEIDS_SELECTED_BY_USER_RESET
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
export const roleIDsSelectedByUserReset = makeActionCreator(
	ROLEIDS_SELECTED_BY_USER_RESET, 
	"key", 
	"value"
)
