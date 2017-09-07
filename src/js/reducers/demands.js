import createReducer, {
	paginate, 
	mergeIntoOrRemoveFromObject 
} from './utilities'
import {
	DEMANDS_REQUEST, 
	DEMANDS_SUCCESS, 
	DEMANDS_FAILURE
} from '../actions/types'

const demands = createReducer(
	{}, 
	{
		DEMANDS_SUCCESS: mergeIntoOrRemoveFromObject, 
		DEMANDS_FAILURE: mergeIntoOrRemoveFromObject
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
