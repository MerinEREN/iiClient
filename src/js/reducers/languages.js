import createReducer, {
	paginate, 
	fetchRequest, 
	fetchSuccessEntities, 
	fetchSuccess, 
	fetchFailure, 
	resetAnArrayOrAnObject, 
	addToOrRemoveFromAnArray
} from "./utilities"
import {
	LANGUAGES_REQUEST, 
	LANGUAGES_SUCCESS, 
	LANGUAGES_FAILURE, 
	LANGUAGEIDS_SELECTED_ADD_REMOVE
} from "../actions/types"

// Slice Reducers
const languages = createReducer(
	{}, 
	{
		LANGUAGES_SUCCESS: fetchSuccessEntities
	}
)
export const languagesBuffered = createReducer(
	{}, 
	{
		LANGUAGES_REQUEST: fetchRequest, 
		LANGUAGES_SUCCESS: fetchSuccess, 
		LANGUAGES_FAILURE: fetchFailure
	}
)
export const languagesPagination = paginate({
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
		LANGUAGES_REQUEST: resetAnArrayOrAnObject, 
		LANGUAGEIDS_SELECTED_ADD_REMOVE: addToOrRemoveFromAnArray
	}
)

export default languages
