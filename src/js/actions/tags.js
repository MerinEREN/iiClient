import makeActionCreator from "./creator"
import {
	TAGS_REQUEST, 
	TAGS_SUCCESS, 
	TAGS_FAILURE, 
	TAGIDS_SELECTED_BY_USER_SET, 
	TAGIDS_SELECTED_BY_USER_REMOVE
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
export const tagIDsSelectedByUserSet = makeActionCreator(
	TAGIDS_SELECTED_BY_USER_SET, 
	"key", 
	"value"
)
export const tagIDsSelectedByUserRemove = makeActionCreator(
	TAGIDS_SELECTED_BY_USER_REMOVE, 
	"key"
)
