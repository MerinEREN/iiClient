import createReducer, {
	paginate, 
	fetchRequest, 
	fetchSuccessEntities, 
	fetchSuccess, 
	fetchFailure, 
	resetAnArrayOrAnObject, 
	addToOrRemoveFromAnArray
} from "./utilities"
import {
	USERS_REQUEST,
	USERS_SUCCESS,
	USERS_FAILURE, 
	USERIDS_SELECTED_ADD_REMOVE
} from "../actions/types"

// Slice Reducers
const users = createReducer(
	{}, 
	{
		USERS_SUCCESS: fetchSuccessEntities
	}
)
export const usersBuffered = createReducer(
	{}, 
	{
		USERS_REQUEST: fetchRequest, 
		USERS_SUCCESS: fetchSuccess, 
		USERS_FAILURE: fetchFailure
	}
)
export const usersPagination = paginate({
	mapActionToKey: action => action.key, 
	types: [
		USERS_REQUEST, 
		USERS_SUCCESS, 
		USERS_FAILURE
	]
})
export const userIDsSelected = createReducer([], 
	{
		USERS_REQUEST: resetAnArrayOrAnObject, 
		USERIDS_SELECTED_ADD_REMOVE: addToOrRemoveFromAnArray
	}
)

export default users
