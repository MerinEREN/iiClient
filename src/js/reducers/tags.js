import createReducer, {
	paginate, 
	fetchRequest, 
	fetchSuccessEntities, 
	fetchSuccess, 
	fetchFailure, 
	addToAnObjectWithKey, 
	removeFromAnObjectByKey
} from "./utilities"
import {
	TAGS_REQUEST, 
	TAGS_SUCCESS, 
	TAGS_FAILURE, 
	TAGIDS_SELECTED_BY_KEY_SET, 
	TAGIDS_SELECTED_BY_KEY_REMOVE
} from "../actions/types"

// Slice Reducers
const tags = createReducer(
	{}, 
	{
		TAGS_SUCCESS: fetchSuccessEntities
	}
)
export const tagsBuffered = createReducer(
	{}, 
	{
		TAGS_REQUEST: fetchRequest, 
		TAGS_SUCCESS: fetchSuccess, 
		TAGS_FAILURE: fetchFailure
	}
)
export const tagsPagination = paginate({
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
		TAGIDS_SELECTED_BY_KEY_SET: addToAnObjectWithKey, 
		TAGIDS_SELECTED_BY_KEY_REMOVE: removeFromAnObjectByKey
	}
)

export default tags
