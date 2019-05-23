import createReducer, {
	paginate, 
	fetchRequest, 
	fetchSuccessEntities, 
	fetchSuccess, 
	fetchFailure, 
	addAValueToAnObjectByKey, 
	removeAValueFromAnObjectByKey
} from "./utilities"
import {
	TAGS_REQUEST, 
	TAGS_SUCCESS, 
	TAGS_FAILURE, 
	TAGID_SELECTED_BY_KEY_ADD, 
	TAGID_SELECTED_BY_KEY_REMOVE
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
		TAGID_SELECTED_BY_KEY_ADD: addAValueToAnObjectByKey, 
		TAGID_SELECTED_BY_KEY_REMOVE: removeAValueFromAnObjectByKey
	}
)

export default tags
