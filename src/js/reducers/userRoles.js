import createReducer, {
	mergeIntoOrRemoveFromObject, 
	removeFromObjectIfDeleteOrMergeIntoOrResetObject, 
	mergeIntoOrResetObject, 
	fetchFailure
} from "./utilities"
import {
	USER_ROLES_REQUEST, 
	USER_ROLES_SUCCESS, 
	USER_ROLES_FAILURE
} from "../actions/types"

// Slice Reducers
const rolesByUser = createReducer(
	{}, 
	{
		USER_ROLES_SUCCESS: removeFromObjectIfDeleteOrMergeIntoOrResetObject
	}
)
export const rolesByUserBuffered = createReducer(
	{}, 
	{
		USER_ROLES_REQUEST: mergeIntoOrRemoveFromObject, 
		USER_ROLES_SUCCESS: mergeIntoOrResetObject, 
		USER_ROLES_FAILURE: fetchFailure
	}
)

export default rolesByUser
