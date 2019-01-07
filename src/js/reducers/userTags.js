import createReducer, {
	mergeIntoOrRemoveFromObject, 
	removeFromObjectIfDeleteOrMergeIntoOrResetObject, 
	mergeIntoOrResetObject, 
	fetchFailure, 
	removeByKeyFromAnObject
} from "./utilities"
import {
	USER_TAGS_REQUEST, 
	USER_TAGS_SUCCESS, 
	USER_TAGS_FAILURE, 
	USER_TAGS_REMOVE
} from "../actions/types"

// Slice Reducers
const tagsByUser = createReducer(
	{}, 
	{
		USER_TAGS_SUCCESS: removeFromObjectIfDeleteOrMergeIntoOrResetObject, 
		USER_TAGS_REMOVE: removeByKeyFromAnObject
	}
)
export const tagsByUserBuffered = createReducer(
	{}, 
	{
		USER_TAGS_REQUEST: mergeIntoOrRemoveFromObject, 
		USER_TAGS_SUCCESS: mergeIntoOrResetObject, 
		USER_TAGS_FAILURE: fetchFailure, 
		USER_TAGS_REMOVE: removeByKeyFromAnObject
	}
)

export default tagsByUser
