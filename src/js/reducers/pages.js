import createReducer, {
	paginate, 
	mergeIntoOrRemoveFromObject, 
	removeFromObjectIfDeleteOrMergeIntoOrResetObject, 
	mergeIntoOrResetObject, 
	fetchFailure, 
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
		PAGES_SUCCESS: removeFromObjectIfDeleteOrMergeIntoOrResetObject, 
		...page
	}
)
export const pagesBuffered = createReducer(
	{}, 
	{
		PAGES_REQUEST: mergeIntoOrRemoveFromObject, 
		PAGES_SUCCESS: mergeIntoOrResetObject, 
		PAGES_FAILURE: fetchFailure, 
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
		PAGES_REQUEST: resetArrayOrObject, 
		PAGEIDS_SELECTED_ADD_REMOVE: addToOrRemoveFromArray
	}
)

export default pages
