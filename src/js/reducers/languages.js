import {combineReducers} from 'redux'
import createReducer, {
	paginate, 
	mergeObjectIntoObject, 
	pushIDs, 
	removeFromObject, 
	removeFromArray
} from './utilities'
import {
	LANGUAGES_REQUEST, 
	LANGUAGES_SUCCESS, 
	LANGUAGES_FAILURE
} from '../actions/types'

// Slice Reducers
const byID = createReducer(
	{}, 
	{
		LANGUAGES_SUCCESS: mergeObjectIntoObject, 
		LANGUAGES_FAILURE: removeFromObject
	}
)
const allIDs = createReducer(
	[], 
	{
		LANGUAGES_SUCCESS: pushIDs,
		LANGUAGES_FAILURE: removeFromArray
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

// Higher-Order Reducer
const languages = combineReducers({
	byID,
	allIDs
})

export default languages


