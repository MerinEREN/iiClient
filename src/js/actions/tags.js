import makeActionCreator from "./creator"
import {
	TAGS_REQUEST, 
	TAGS_SUCCESS, 
	TAGS_FAILURE, 
	TAGID_SELECTED_BY_KEY_ADD, 
	TAGID_SELECTED_BY_KEY_REMOVE
	/*
	TAGIDS_SELECTED_BY_KEY_SET, 
	TAGIDS_SELECTED_BY_KEY_REMOVE
	*/
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
export const tagIDSelectedByKeyAdd = makeActionCreator(
	TAGID_SELECTED_BY_KEY_ADD, 
	"key", 
	"value"
)
export const tagIDSelectedByKeyRemove = makeActionCreator(
	TAGID_SELECTED_BY_KEY_REMOVE, 
	"key", 
	"value"
)
/*
export const tagIDsSelectedByKeySet = makeActionCreator(
	TAGIDS_SELECTED_BY_KEY_SET, 
	"data"
)
export const tagIDsSelectedByKeyRemove = makeActionCreator(
	TAGIDS_SELECTED_BY_KEY_REMOVE, 
	"key"
)
*/
