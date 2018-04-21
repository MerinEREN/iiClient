import createReducer, {
	paginate, 
	mergeIntoOrRemoveFromObjectRequest, 
	mergeIntoOrResetObject, 
	entitiesBufferedReset
} from './utilities'
import {
	DEMANDS_REQUEST, 
	DEMANDS_SUCCESS, 
	DEMANDS_FAILURE
} from '../actions/types'

const demands = createReducer(
	{}, 
	{
		DEMANDS_SUCCESS: mergeIntoOrResetObject
	}
)
export const demandsBuffered = createReducer(
	{}, 
	{
		DEMANDS_REQUEST: mergeIntoOrRemoveFromObjectRequest, 
		DEMANDS_SUCCESS: mergeIntoOrResetObject, 
		DEMANDS_FAILURE: entitiesBufferedReset
	}
)
export const paginationDemands = paginate({
	mapActionToKey: action => action.key, 
	types: [
		DEMANDS_REQUEST, 
		DEMANDS_SUCCESS, 
		DEMANDS_FAILURE
	]
})

export default demands
