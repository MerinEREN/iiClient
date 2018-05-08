import createReducer, {
	paginate, 
	mergeIntoOrRemoveFromObjectRequest, 
	mergeIntoOrResetObject, 
	entitiesBufferedReset, 
	addToOrRemoveFromArray, 
	resetArrayOrObject
} from './utilities'
import {
	LANGUAGES_REQUEST, 
	LANGUAGES_SUCCESS, 
	LANGUAGES_FAILURE, 
	LANGUAGEIDS_SELECTED_ADD_REMOVE
} from '../actions/types'

// Slice Reducers
const languages = createReducer(
	{}, 
	{
		LANGUAGES_SUCCESS: mergeIntoOrResetObject
	}
)
export const languagesBuffered = createReducer(
	{}, 
	{
		LANGUAGES_REQUEST: mergeIntoOrRemoveFromObjectRequest, 
		LANGUAGES_SUCCESS: mergeIntoOrResetObject, 
		LANGUAGES_FAILURE: entitiesBufferedReset
	}
)
export const paginationLanguages = paginate({
	mapActionToKey: action => action.key, 
	types: [
		LANGUAGES_REQUEST, 
		LANGUAGES_SUCCESS, 
		LANGUAGES_FAILURE
	]
})
export const languageIDsSelected = createReducer([], 
	{
		LANGUAGES_REQUEST: resetArrayOrObject, 
		LANGUAGEIDS_SELECTED_ADD_REMOVE: addToOrRemoveFromArray
	}
)

export default languages
