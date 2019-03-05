import makeActionCreator from "./creator"
import {
	USER_TAGS_REQUEST, 
	USER_TAGS_SUCCESS, 
	USER_TAGS_FAILURE, 
	USER_TAGS_REMOVE
} from "./types"

// Action Creators
export const userTagsRequest = makeActionCreator(
	USER_TAGS_REQUEST
)
export const userTagsSuccess = makeActionCreator(
	USER_TAGS_SUCCESS
)
export const userTagsFailure = makeActionCreator(
	USER_TAGS_FAILURE
)
export const userTagsRemove = makeActionCreator(
	USER_TAGS_REMOVE
)
