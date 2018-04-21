import createReducer, {
	paginate, 
	mergeIntoOrRemoveFromObjectRequest, 
	mergeIntoOrResetObject, 
	entitiesBufferedReset, 
	addToOrRemoveFromArray, 
	resetArrayOrObject
} from "./utilities"
import {
	PAGES_REQUEST, 
	PAGES_SUCCESS, 
	PAGES_FAILURE,
	PAGEIDS_SELECTED_ADD_REMOVE
} from "../actions/types"
import page, {pageBuffered} from "./page"

// Slice Reducers
const pages = createReducer(
	{}, 
	{
		PAGES_SUCCESS: mergeIntoOrResetObject, 
		...page
	}
)
export const pagesBuffered = createReducer(
	{}, 
	{
		PAGES_REQUEST: mergeIntoOrRemoveFromObjectRequest, 
		PAGES_SUCCESS: mergeIntoOrResetObject, 
		PAGES_FAILURE: entitiesBufferedReset, 
		...pageBuffered
	}
)
export const paginationPages = paginate({
	mapActionToKey: action => action.key, 
	types: [
		PAGES_REQUEST, 
		PAGES_SUCCESS, 
		PAGES_FAILURE
	]
})
export const pageIDsSelected = createReducer([], 
	{
		PAGES_SUCCESS: resetArrayOrObject, 
		PAGEIDS_SELECTED_ADD_REMOVE: addToOrRemoveFromArray
	}
)

export default pages
