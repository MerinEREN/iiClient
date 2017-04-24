import {combineReducers} from 'redux'
import createReducer, {
	paginate, 
	mergeKeysIntoArray, 
	mergeObjectsIntoObject
} from './utilities'
import {
	OFFERS_REQUEST, 
	OFFERS_SUCCESS, 
	OFFERS_FAILURE
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
		OFFERS_SUCCESS: mergeById
	}
)
const allIds = createReducer(
	[], 
	{
		OFFERS_SUCCESS: pushIds
	}
)
export const paginationOffers = paginate({
	mapActionToKey: action => action.groupID, 
	types: [
		OFFERS_REQUEST, 
		OFFERS_SUCCESS, 
		OFFERS_FAILURE
	]
})

// Higher-Order Reducer
const offers = combineReducers({
	byId,
	allIds
})

export default offers
