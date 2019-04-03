import makeActionCreator from "./creator"
import {
	PHOTOS_REQUEST, 
	PHOTOS_SUCCESS, 
	PHOTOS_FAILURE, 
	PHOTOIDS_SELECTED_BY_KEY_SET, 
	PHOTOIDS_SELECTED_BY_KEY_REMOVE
} from "./types"

// Action Creators
export const photosRequest = makeActionCreator(
	PHOTOS_REQUEST
)
export const photosSuccess = makeActionCreator(
	PHOTOS_SUCCESS
)
export const photosFailure = makeActionCreator(
	PHOTOS_FAILURE
)
export const photoIDsSelectedByKeySet = makeActionCreator(
	PHOTOIDS_SELECTED_BY_KEY_SET, 
	"data"
)
export const photoIDsSelectedByKeyRemove = makeActionCreator(
	PHOTOIDS_SELECTED_BY_KEY_REMOVE, 
	"key"
)
