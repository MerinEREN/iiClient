import createReducer, {
	paginate, 
	mergeIntoOrRemoveFromObjectSuccess, 
	mergeIntoOrRemoveFromObjectFailure
} from './utilities'
import {
	DEMANDS_REQUEST, 
	DEMANDS_SUCCESS, 
	DEMANDS_FAILURE
} from '../actions/types'

const demands = createReducer(
	{}, 
	{
		DEMANDS_SUCCESS: mergeIntoOrRemoveFromObjectSuccess, 
		DEMANDS_FAILURE: mergeIntoOrRemoveFromObjectFailure
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

export default demands
