import createReducer, {
	paginate, 
	mergeIntoOrRemoveFromObject, 
	removeFromObjectIfDeleteOrMergeIntoOrResetObject, 
	mergeIntoOrResetObject, 
	fetchFailure, 
	addToOrRemoveFromArray, 
	resetArrayOrObject
} from "./utilities"
import {
	USERS_REQUEST,
	USERS_SUCCESS,
	USERS_FAILURE, 
	USERIDS_SELECTED_ADD_REMOVE
} from "../actions/types"
import user, {userBuffered} from "./user"

// Slice Reducers
const users = createReducer(
	{}, 
	{
		USERS_SUCCESS: removeFromObjectIfDeleteOrMergeIntoOrResetObject, 
		...user
	}
)
export const usersBuffered = createReducer(
	{}, 
	{
		USERS_REQUEST: mergeIntoOrRemoveFromObject, 
		USERS_SUCCESS: mergeIntoOrResetObject, 
		USERS_FAILURE: fetchFailure, 
		...userBuffered
	}
)
export const paginationUsers = paginate({
	mapActionToKey: action => action.key, 
	types: [
		USERS_REQUEST, 
		USERS_SUCCESS, 
		USERS_FAILURE
	]
})
export const userIDsSelected = createReducer([], 
	{
		USERS_REQUEST: resetArrayOrObject, 
		USERIDS_SELECTED_ADD_REMOVE: addToOrRemoveFromArray
	}
)

export default users
