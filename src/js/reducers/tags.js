import createReducer, {
	paginate, 
	mergeIntoOrRemoveFromObjectRequest, 
	removeFromObjectIfDeleteOrMergeIntoOrResetObject, 
	mergeIntoOrResetObject, 
	fetchFailure
} from './utilities'
import {
	TAGS_REQUEST, 
	TAGS_SUCCESS, 
	TAGS_FAILURE
} from '../actions/types'

// Slice Reducers
const tags = createReducer(
	{}, 
	{
		TAGS_SUCCESS: removeFromObjectIfDeleteOrMergeIntoOrResetObject
	}
)
export const tagsBuffered = createReducer(
	{}, 
	{
		TAGS_REQUEST: mergeIntoOrRemoveFromObjectRequest, 
		TAGS_SUCCESS: mergeIntoOrResetObject, 
		TAGS_FAILURE: fetchFailure
	}
)
export const paginationTags = paginate({
	mapActionToKey: action => action.key, 
	types: [
		TAGS_REQUEST, 
		TAGS_SUCCESS, 
		TAGS_FAILURE
	]
})

export default tags

