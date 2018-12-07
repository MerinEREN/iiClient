import createReducer, {
	paginate, 
	mergeIntoOrRemoveFromObject, 
	removeFromObjectIfDeleteOrMergeIntoOrResetObject, 
	mergeIntoOrResetObject, 
	fetchFailure, 
	resetArrayOrObject, 
	resetReducerPartially
} from "./utilities"
import {
	TAGS_REQUEST, 
	TAGS_SUCCESS, 
	TAGS_FAILURE, 
	USER_TAGS_REQUEST, 
	TAGIDS_SELECTED_BY_USER_RESET
} from "../actions/types"

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
		TAGS_REQUEST: mergeIntoOrRemoveFromObject, 
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

export const tagIDsSelectedByUser = createReducer(
	{},   
	{
		USER_TAGS_REQUEST: resetArrayOrObject, 
		TAGIDS_SELECTED_BY_USER_RESET: resetReducerPartially
	}
)

export default tags
