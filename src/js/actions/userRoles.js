import makeActionCreator from "./creator"
import {
	USER_ROLES_REQUEST, 
	USER_ROLES_SUCCESS, 
	USER_ROLES_FAILURE, 
	USER_ROLES_REMOVE
} from "./types"

// Action Creators
export const userRolesRequest = makeActionCreator(
	USER_ROLES_REQUEST
)
export const userRolesSuccess = makeActionCreator(
	USER_ROLES_SUCCESS
)
export const userRolesFailure = makeActionCreator(
	USER_ROLES_FAILURE
)
export const userRolesRemove = makeActionCreator(
	USER_ROLES_REMOVE, 
	"key"
)
