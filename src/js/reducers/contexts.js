import createReducer, {
	paginate, 
	fetchRequest, 
	fetchSuccessEntities, 
	fetchSuccess, 
	fetchFailure,
	resetAnObject, 
	resetAnArrayOrAnObject, 
	addToOrRemoveFromAnArray
} from "./utilities"
import {
	contextUpdate
} from "./context"
import {
	CONTEXTS_REQUEST, 
	CONTEXTS_SUCCESS, 
	CONTEXTS_FAILURE, 
	CONTEXT_UPDATE, 
	CONTEXTIDS_SELECTED_ADD_REMOVE, 
	CONTEXTS_RESET_ALL
} from "../actions/types"

const contexts = createReducer(
	{}, 
	{
		CONTEXTS_SUCCESS: fetchSuccessEntities, 
		CONTEXTS_RESET_ALL: resetAnObject
	}
)
export const contextsBuffered = createReducer(
	{}, 
	{
		CONTEXTS_REQUEST: fetchRequest, 
		CONTEXTS_SUCCESS: fetchSuccess, 
		CONTEXTS_FAILURE: fetchFailure, 
		CONTEXTS_RESET_ALL: resetAnObject, 
		CONTEXT_UPDATE: contextUpdate
	}
)
export const contextsPagination = paginate({
	mapActionToKey: action => action.key, 
	types: [
		CONTEXTS_REQUEST, 
		CONTEXTS_SUCCESS, 
		CONTEXTS_FAILURE, 
		CONTEXTS_RESET_ALL
	]
})
export const contextIDsSelected = createReducer(
	[],   
	{
		CONTEXTS_REQUEST: resetAnArrayOrAnObject, 
		CONTEXTIDS_SELECTED_ADD_REMOVE: addToOrRemoveFromAnArray
	}
)

export default contexts
