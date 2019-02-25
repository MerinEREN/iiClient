import createReducer, {
	paginate, 
	mergeIntoOrRemoveFromObject, 
	removeFromObjectIfDeleteOrMergeIntoOrResetObject, 
	mergeIntoOrResetObject, 
	fetchFailure, 
	resetReducerPartially, 
	setReducerPartially, 
	removeByKeyFromAnObject
} from "./utilities"
import {
	ROLES_REQUEST, 
	ROLES_SUCCESS, 
	ROLES_FAILURE, 
	USER_ROLES_REQUEST, 
	ROLEIDS_SELECTED_BY_KEY_SET, 
	ROLEIDS_SELECTED_BY_KEY_REMOVE
} from "../actions/types"

// Slice Reducers
const roles = createReducer(
	{}, 
	{
		ROLES_SUCCESS: removeFromObjectIfDeleteOrMergeIntoOrResetObject
	}
)
export const rolesBuffered = createReducer(
	{}, 
	{
		ROLES_REQUEST: mergeIntoOrRemoveFromObject, 
		ROLES_SUCCESS: mergeIntoOrResetObject, 
		ROLES_FAILURE: fetchFailure
	}
)
export const paginationRoles = paginate({
	mapActionToKey: action => action.key, 
	types: [
		ROLES_REQUEST, 
		ROLES_SUCCESS, 
		ROLES_FAILURE
	]
})

export const roleIDsSelectedByKey = createReducer(
	{},   
	{
		USER_ROLES_REQUEST: resetReducerPartially, 
		ROLEIDS_SELECTED_BY_KEY_SET: setReducerPartially, 
		ROLEIDS_SELECTED_BY_KEY_REMOVE: removeByKeyFromAnObject
	}
)

export default roles
