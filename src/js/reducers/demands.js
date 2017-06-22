import {combineReducers} from 'redux'
import createReducer, {
	paginate, 
	mergeObjectIntoObject, 
	pushIDs
} from './utilities'
import {
	DEMANDS_REQUEST, 
	DEMANDS_SUCCESS, 
	DEMANDS_FAILURE
} from '../actions/types'

// Slice Reducers
const byID = createReducer(
	{}, 
	{
		DEMANDS_SUCCESS: mergeObjectIntoObject
	}
)
const allIDs = createReducer(
	[], 
	{
		DEMANDS_SUCCESS: pushIDs
	}
)
export const paginationDemands = paginate({
	mapActionToKey: action => action.groupID, 
	types: [
		DEMANDS_REQUEST, 
		DEMANDS_SUCCESS, 
		DEMANDS_FAILURE
	]
})

// Higher-Order Reducer
const demands = combineReducers({
	byID,
	allIDs
})

export default demands
