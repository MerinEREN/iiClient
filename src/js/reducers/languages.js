import createReducer, {
	paginate, 
	mergeIntoOrRemoveFromObjectSuccess, 
	mergeIntoOrRemoveFromObjectFailure, 
	mergeIntoOrRemoveFromObject
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
		LANGUAGES_SUCCESS: mergeIntoOrRemoveFromObjectSuccess, 
		LANGUAGES_FAILURE: mergeIntoOrRemoveFromObjectFailure
	}
)
export const paginationLanguages = paginate({
	mapActionToKey: action => action.groupID, 
	types: [
		LANGUAGES_REQUEST, 
		LANGUAGES_SUCCESS, 
		LANGUAGES_FAILURE
	]
})

export const languagesSelected = createReducer( {},  
	{
		LANGUAGES_SELECTED_ADD_REMOVE: mergeIntoOrRemoveFromObject
	}
)

export default languages
