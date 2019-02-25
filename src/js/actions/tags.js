import makeActionCreator from "./creator"
import {
	TAGS_REQUEST, 
	TAGS_SUCCESS, 
	TAGS_FAILURE, 
	TAGIDS_SELECTED_BY_KEY_SET, 
	TAGIDS_SELECTED_BY_KEY_REMOVE, 
	TAGS_BY_FILTER_SUCCESS
} from "./types"

// Action Creators
export const tagsRequest = makeActionCreator(
	TAGS_REQUEST
)
export const tagsSuccess = makeActionCreator(
	TAGS_SUCCESS
)
export const tagsFailure = makeActionCreator(
	TAGS_FAILURE
)
export const tagIDsSelectedByKeySet = makeActionCreator(
	TAGIDS_SELECTED_BY_KEY_SET, 
	"key", 
	"value"
)
export const tagIDsSelectedByKeyRemove = makeActionCreator(
	TAGIDS_SELECTED_BY_KEY_REMOVE, 
	"key"
)
export const tagsByFilterSuccess = makeActionCreator(
	TAGS_BY_FILTER_SUCCESS
)
