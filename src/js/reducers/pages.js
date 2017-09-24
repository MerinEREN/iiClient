import createReducer, {
	paginate, 
	mergeIntoOrRemoveFromObjectSuccess, 
	mergeIntoOrRemoveFromObjectFailure
} from './utilities'
import {
	PAGES_REQUEST, 
	PAGES_SUCCESS, 
	PAGES_FAILURE
} from '../actions/types'

const pages = createReducer(
	{}, 
	{
		PAGES_SUCCESS: mergeIntoOrRemoveFromObjectSuccess, 
		PAGES_FAILURE: mergeIntoOrRemoveFromObjectFailure
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
