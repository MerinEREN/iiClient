import createReducer, {
	paginate, 
	mergeIntoOrRemoveFromObjectSuccess, 
	mergeIntoOrRemoveFromObjectFailure
} from './utilities'
import {
	LANGUAGES_REQUEST, 
	LANGUAGES_SUCCESS, 
	LANGUAGES_FAILURE
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

export default languages
