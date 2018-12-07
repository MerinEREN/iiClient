import createReducer, {
	paginate, 
	mergeIntoOrRemoveFromObject, 
	removeFromObjectIfDeleteOrMergeIntoOrResetObject, 
	mergeIntoOrResetObject, 
	fetchFailure, 
	resetArrayOrObject, 
	resetReducer
} from "./utilities"
import {
	ROLETYPES_REQUEST, 
	ROLETYPES_SUCCESS, 
	ROLETYPES_FAILURE, 
	ROLETYPEIDS_SELECTED_RESET
} from "../actions/types"

// Slice Reducers
const roleTypes = createReducer(
	{}, 
	{
		ROLETYPES_SUCCESS: removeFromObjectIfDeleteOrMergeIntoOrResetObject
	}
)
export const roleTypesBuffered = createReducer(
	{}, 
	{
		ROLETYPES_REQUEST: mergeIntoOrRemoveFromObject, 
		ROLETYPES_SUCCESS: mergeIntoOrResetObject, 
		ROLETYPES_FAILURE: fetchFailure
	}
)
export const paginationRoleTypes = paginate({
	mapActionToKey: action => action.key, 
	types: [
		ROLETYPES_REQUEST, 
		ROLETYPES_SUCCESS, 
		ROLETYPES_FAILURE
	]
})

export const roleTypeIDsSelected = createReducer(
	[],  
	{
		ROLETYPEIDS_SELECTED_RESET: resetReducer
	}
)

export default roleTypes
