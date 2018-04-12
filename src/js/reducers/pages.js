import createReducer, {
	paginate, 
	mergeIntoOrResetObject, 
	mergeIntoOrRemoveFromObjectFetch
} from './utilities'
import {
	PAGES_REQUEST, 
	PAGES_SUCCESS, 
	PAGES_FAILURE, 
	PAGE_SUCCESS, 
	PAGE_FAILURE
} from '../actions/types'

const pages = createReducer(
	{}, 
	{
		PAGES_SUCCESS: mergeIntoOrResetObject, 
		PAGE_SUCCESS: mergeIntoOrResetObject
	}
)
export const pagesBuffered = createReducer(
	{}, 
	{
		PAGES_REQUEST: mergeIntoOrRemoveFromObjectFetch, 
		PAGES_SUCCESS: mergeIntoOrResetObject, 
		PAGE_SUCCESS: mergeIntoOrResetObject
	}
)
export const paginationPages = paginate({
	mapActionToKey: action => action.groupID, 
	types: [
		PAGES_REQUEST, 
		PAGES_SUCCESS, 
		PAGES_FAILURE
	]
})

export default pages
