import {combineReducers} from 'redux'
import createReducer, {
	paginate, 
	mergeKeysIntoArray, 
	mergeObjectsIntoObject
} from './utilities'
import {
	PAGES_REQUEST, 
	PAGES_SUCCESS, 
	PAGES_FAILURE
} from '../actions/types'

// Case Reducers
function mergeById(state, action) {
	return {...state, ...action.response.result}
}
function pushIds(state, action) {
	return mergeKeysIntoArray(state, action.response.result)
}

// Slice Reducers
const byId = createReducer(
	{}, 
	{
		PAGES_SUCCESS: mergeById
	}
)
const allIds = createReducer(
	[], 
	{
		PAGES_SUCCESS: pushIds
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
	byId,
	allIds
})

export default pages

