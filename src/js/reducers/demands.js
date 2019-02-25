import createReducer, {
	paginate, 
	mergeIntoOrRemoveFromObject, 
	removeFromObjectIfDeleteOrMergeIntoOrResetObject, 
	mergeIntoOrResetObject, 
	fetchFailure
} from "./utilities"
import {
	DEMANDS_REQUEST, 
	DEMANDS_SUCCESS, 
	DEMANDS_FAILURE
} from "../actions/types"
import demand, {demandBuffered} from "./demand"

const demands = createReducer(
	{}, 
	{
		DEMANDS_SUCCESS: removeFromObjectIfDeleteOrMergeIntoOrResetObject, 
		...demand
	}
)
export const demandsBuffered = createReducer(
	{}, 
	{
		DEMANDS_REQUEST: mergeIntoOrRemoveFromObject, 
		DEMANDS_SUCCESS: mergeIntoOrResetObject, 
		DEMANDS_FAILURE: fetchFailure, 
		...demandBuffered
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
