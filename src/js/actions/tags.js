import makeActionCreator from "./creator"
import {
	TAGS_REQUEST, 
	TAGS_SUCCESS, 
	TAGS_FAILURE, 
	TAGIDS_SELECTED_RESET
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
export const tagIDsSelectedReset = makeActionCreator(
	TAGIDS_SELECTED_RESET, 
	"value"
)
