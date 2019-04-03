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
	PHOTOS_REQUEST, 
	PHOTOS_SUCCESS, 
	PHOTOS_FAILURE, 
	PHOTOIDS_SELECTED_BY_KEY_SET, 
	PHOTOIDS_SELECTED_BY_KEY_REMOVE
} from "../actions/types"

// Slice Reducers
const photos = createReducer(
	{}, 
	{
		PHOTOS_SUCCESS: fetchSuccessEntities
	}
)
export const photosBuffered = createReducer(
	{}, 
	{
		PHOTOS_REQUEST: fetchRequest, 
		PHOTOS_SUCCESS: fetchSuccess, 
		PHOTOS_FAILURE: fetchFailure
	}
)
export const photosPagination = paginate({
	mapActionToKey: action => action.key, 
	types: [
		PHOTOS_REQUEST, 
		PHOTOS_SUCCESS, 
		PHOTOS_FAILURE
	]
})
export const photoIDsSelectedByKey = createReducer(
	{},   
	{
		PHOTOIDS_SELECTED_BY_KEY_SET: addToAnObjectWithKey, 
		PHOTOIDS_SELECTED_BY_KEY_REMOVE: removeFromAnObjectByKey
	}
)

export default photos
