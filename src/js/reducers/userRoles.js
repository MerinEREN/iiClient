import createReducer, {
	mergeIntoOrRemoveFromObject, 
	removeFromObjectIfDeleteOrMergeIntoOrResetObject, 
	mergeIntoOrResetObject, 
	fetchFailure, 
	removeByKeyFromAnObject
} from "./utilities"
import {
	USER_ROLES_REQUEST, 
	USER_ROLES_SUCCESS, 
	USER_ROLES_FAILURE, 
	USER_ROLES_REMOVE
} from "../actions/types"

// Slice Reducers
const rolesByUser = createReducer(
	{}, 
	{
		USER_ROLES_SUCCESS: removeFromObjectIfDeleteOrMergeIntoOrResetObject, 
		USER_ROLES_REMOVE: removeByKeyFromAnObject
	}
)
export const rolesByUserBuffered = createReducer(
	{}, 
	{
		USER_ROLES_REQUEST: mergeIntoOrRemoveFromObject, 
		USER_ROLES_SUCCESS: mergeIntoOrResetObject, 
		USER_ROLES_FAILURE: fetchFailure, 
		USER_ROLES_REMOVE: removeByKeyFromAnObject
	}
)

export default rolesByUser
