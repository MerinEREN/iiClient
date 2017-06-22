import {combineReducers} from 'redux'
import createReducer, {
	paginate, 
	mergeObjectIntoObject, 
	pushIDs, 
	removeFromObject, 
	removeFromArray
} from './utilities'
import {
	PAGES_REQUEST, 
	PAGES_SUCCESS, 
	PAGES_FAILURE
} from '../actions/types'

// Slice Reducers
const byID = createReducer(
	{}, 
	{
		PAGES_SUCCESS: mergeObjectIntoObject, 
		PAGES_FAILURE: removeFromObject
	}
)
const allIDs = createReducer(
	[], 
	{
		PAGES_SUCCESS: pushIDs,
		PAGES_FAILURE: removeFromArray
	}
)
export const paginationPages = paginate({
	mapActionToKey: action => action.groupID, 
	types: [
		PAGES_REQUEST, 
		PAGES_SUCCESS, 
		PAGES_FAILURE
	]
})

// Higher-Order Reducer
const pages = combineReducers({
	byID,
	allIDs
})

export default pages

