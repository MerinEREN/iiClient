import createReducer, {
	paginate, 
	fetchRequest, 
	fetchSuccessEntities, 
	fetchSuccess, 
	fetchFailure
	// resetReducer
} from "./utilities"
import {
	ROLETYPES_REQUEST, 
	ROLETYPES_SUCCESS, 
	ROLETYPES_FAILURE
	// ROLETYPEIDS_SELECTED_RESET
} from "../actions/types"

// Slice Reducers
const roleTypes = createReducer(
	{}, 
	{
		ROLETYPES_SUCCESS: fetchSuccessEntities
	}
)
export const roleTypesBuffered = createReducer(
	{}, 
	{
		ROLETYPES_REQUEST: fetchRequest, 
		ROLETYPES_SUCCESS: fetchSuccess, 
		ROLETYPES_FAILURE: fetchFailure
	}
)
export const roleTypesPagination = paginate({
	mapActionToKey: action => action.key, 
	types: [
		ROLETYPES_REQUEST, 
		ROLETYPES_SUCCESS, 
		ROLETYPES_FAILURE
	]
})

/* 
export const roleTypeIDsSelected = createReducer(
	[],  
	{
		ROLETYPEIDS_SELECTED_RESET: resetReducer
	}
)
*/

export default roleTypes
