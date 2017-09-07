import createReducer, {
	paginate, 
	mergeIntoOrRemoveFromObject
} from './utilities'
import {
	PAGES_REQUEST, 
	PAGES_SUCCESS, 
	PAGES_FAILURE
} from '../actions/types'

const pages = createReducer(
	{}, 
	{
		PAGES_SUCCESS: mergeIntoOrRemoveFromObject, 
		PAGES_FAILURE: mergeIntoOrRemoveFromObject
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
