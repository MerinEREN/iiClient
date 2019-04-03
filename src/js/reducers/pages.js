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
	PAGES_REQUEST, 
	PAGES_SUCCESS, 
	PAGES_FAILURE,
	PAGEIDS_SELECTED_ADD_REMOVE
} from "../actions/types"

// Slice Reducers
const pages = createReducer(
	{}, 
	{
		PAGES_SUCCESS: fetchSuccessEntities
	}
)
export const pagesBuffered = createReducer(
	{}, 
	{
		PAGES_REQUEST: fetchRequest, 
		PAGES_SUCCESS: fetchSuccess, 
		PAGES_FAILURE: fetchFailure
	}
)
export const pagesPagination = paginate({
	mapActionToKey: action => action.key, 
	types: [
		PAGES_REQUEST, 
		PAGES_SUCCESS, 
		PAGES_FAILURE
	]
})
export const pageIDsSelected = createReducer([], 
	{
		PAGES_REQUEST: resetAnArrayOrAnObject, 
		PAGEIDS_SELECTED_ADD_REMOVE: addToOrRemoveFromAnArray
	}
)

export default pages
