import {combineReducers} from 'redux'
import createReducer, {
	paginate, 
	mergeKeysIntoArray, 
	mergeObjectsIntoObject
} from './utilities'
import {
	SERVICE_PACKS_REQUEST, 
	SERVICE_PACKS_SUCCESS, 
	SERVICE_PACKS_FAILURE
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
		SERVICE_PACKS_SUCCESS: mergeById
	}
)
const allIds = createReducer(
	[], 
	{
		SERVICE_PACKS_SUCCESS: pushIds
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
	byId,
	allIds
})

export default servicePacks
