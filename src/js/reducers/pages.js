import createReducer, {
	paginate, 
	mergeIntoOrRemoveFromObjectSuccess, 
	mergeIntoOrRemoveFromObjectFailure
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
		PAGES_SUCCESS: mergeIntoOrRemoveFromObjectSuccess, 
		PAGES_FAILURE: mergeIntoOrRemoveFromObjectFailure, 
		PAGE_SUCCESS: mergeIntoOrRemoveFromObjectSuccess, 
		PAGE_FAILURE: mergeIntoOrRemoveFromObjectSuccess
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
