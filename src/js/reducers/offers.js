import {combineReducers} from 'redux'
import createReducer, {
	paginate, 
	mergeObjectIntoObject, 
	pushIDs
} from './utilities'
import {
	OFFERS_REQUEST, 
	OFFERS_SUCCESS, 
	OFFERS_FAILURE
} from '../actions/types'

// Slice Reducers
const byID = createReducer(
	{}, 
	{
		OFFERS_SUCCESS: mergeObjectIntoObject
	}
)
const allIDs = createReducer(
	[], 
	{
		OFFERS_SUCCESS: pushIDs
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
	byID,
	allIDs
})

export default offers
