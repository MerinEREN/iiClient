import {combineReducers} from 'redux'
import createReducer, {
	paginate, 
	mergeObjectIntoObject, 
	pushIDs
} from './utilities'
import {
	SERVICE_PACKS_REQUEST, 
	SERVICE_PACKS_SUCCESS, 
	SERVICE_PACKS_FAILURE
} from '../actions/types'

// Slice Reducers
const byID = createReducer(
	{}, 
	{
		SERVICE_PACKS_SUCCESS: mergeObjectIntoObject
	}
)
const allIDs = createReducer(
	[], 
	{
		SERVICE_PACKS_SUCCESS: pushIDs
	}
)
export const paginationServicePacks = paginate({
	mapActionToKey: action => action.groupID, 
	types: [
		SERVICE_PACKS_REQUEST, 
		SERVICE_PACKS_SUCCESS, 
		SERVICE_PACKS_FAILURE
	]
})

// Higher-Order Reducer
const servicePacks = combineReducers({
	byID,
	allIDs
})

export default servicePacks
