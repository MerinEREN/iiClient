import createReducer, {
	paginate, 
	mergeIntoOrRemoveFromObjectFetch, 
	mergeIntoOrResetObject, 
	entitiesBufferedReset, 
	mergeIntoOrRemoveFromObject, 
	resetObject
} from './utilities'
import {
	LANGUAGES_REQUEST, 
	LANGUAGES_SUCCESS, 
	LANGUAGES_FAILURE, 
	LANGUAGES_SELECTED_ADD_REMOVE
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
		LANGUAGES_REQUEST: mergeIntoOrRemoveFromObjectFetch, 
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
export const languagesSelected = createReducer( {},  
	{
		LANGUAGES_SUCCESS: resetObject, 
		LANGUAGES_SELECTED_ADD_REMOVE: mergeIntoOrRemoveFromObject
	}
)

export default languages
