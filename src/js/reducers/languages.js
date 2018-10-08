import createReducer, {
	paginate, 
	mergeIntoOrRemoveFromObject, 
	removeFromObjectIfDeleteOrMergeIntoOrResetObject, 
	mergeIntoOrResetObject, 
	fetchFailure, 
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
		LANGUAGES_SUCCESS: removeFromObjectIfDeleteOrMergeIntoOrResetObject
	}
)
export const languagesBuffered = createReducer(
	{}, 
	{
		LANGUAGES_REQUEST: mergeIntoOrRemoveFromObject, 
		LANGUAGES_SUCCESS: mergeIntoOrResetObject, 
		LANGUAGES_FAILURE: fetchFailure
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
export const languageIDsSelected = createReducer(
	[], 
	{
		LANGUAGES_REQUEST: resetArrayOrObject, 
		LANGUAGEIDS_SELECTED_ADD_REMOVE: addToOrRemoveFromArray
	}
)

export default languages
