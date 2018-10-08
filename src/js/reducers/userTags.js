import createReducer, {
	mergeIntoOrRemoveFromObject, 
	removeFromObjectIfDeleteOrMergeIntoOrResetObject, 
	mergeIntoOrResetObject, 
	fetchFailure
} from "./utilities"
import {
	USER_TAGS_REQUEST, 
	USER_TAGS_SUCCESS, 
	USER_TAGS_FAILURE
} from "../actions/types"

// Slice Reducers
const tagsByUser = createReducer(
	{}, 
	{
		USER_TAGS_SUCCESS: removeFromObjectIfDeleteOrMergeIntoOrResetObject
	}
)
export const tagsByUserBuffered = createReducer(
	{}, 
	{
		USER_TAGS_REQUEST: mergeIntoOrRemoveFromObject, 
		USER_TAGS_SUCCESS: mergeIntoOrResetObject, 
		USER_TAGS_FAILURE: fetchFailure
	}
)

export default tagsByUser
