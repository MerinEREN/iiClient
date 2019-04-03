import createReducer, {
	paginate, 
	fetchRequest, 
	fetchSuccessEntities, 
	fetchSuccess, 
	fetchFailure, 
	addToAnObjectWithKey, 
	removeFromAnObjectByKey
} from "./utilities"
import {
	ROLES_REQUEST, 
	ROLES_SUCCESS, 
	ROLES_FAILURE, 
	ROLEIDS_SELECTED_BY_KEY_SET, 
	ROLEIDS_SELECTED_BY_KEY_REMOVE
} from "../actions/types"

// Slice Reducers
const roles = createReducer(
	{}, 
	{
		ROLES_SUCCESS: fetchSuccessEntities
	}
)
export const rolesBuffered = createReducer(
	{}, 
	{
		ROLES_REQUEST: fetchRequest, 
		ROLES_SUCCESS: fetchSuccess, 
		ROLES_FAILURE: fetchFailure
	}
)
export const rolesPagination = paginate({
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
		ROLEIDS_SELECTED_BY_KEY_SET: addToAnObjectWithKey, 
		ROLEIDS_SELECTED_BY_KEY_REMOVE: removeFromAnObjectByKey
	}
)

export default roles
