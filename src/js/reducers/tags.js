import createReducer, {
	paginate, 
	mergeIntoOrRemoveFromObject, 
	removeFromObjectIfDeleteOrMergeIntoOrResetObject, 
	mergeIntoOrResetObject, 
	fetchFailure, 
	resetReducerPartially, 
	setReducerPartially, 
	removeByKeyFromAnObject, 
	addDynamicKeyReturnResult
} from "./utilities"
import {
	TAGS_REQUEST, 
	TAGS_SUCCESS, 
	TAGS_FAILURE, 
	USER_TAGS_REQUEST, 
	TAGIDS_SELECTED_BY_KEY_SET, 
	TAGIDS_SELECTED_BY_KEY_REMOVE, 
	TAGS_BY_FILTER_SUCCESS
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
export const tagIDsSelectedByKey = createReducer(
	{},   
	{
		USER_TAGS_REQUEST: resetReducerPartially, 
		TAGIDS_SELECTED_BY_KEY_SET: setReducerPartially, 
		TAGIDS_SELECTED_BY_KEY_REMOVE: removeByKeyFromAnObject
	}
)
export const tagsByFilter = addDynamicKeyReturnResult({
	mapActionToKey: action => action.key, 
	types: [
		TAGS_BY_FILTER_SUCCESS
	]
})

export default tags
