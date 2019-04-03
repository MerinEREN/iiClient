import createReducer, {
	paginate, 
	fetchRequest, 
	fetchSuccessEntities, 
	fetchSuccess, 
	fetchFailure
} from "./utilities"
import {
	DEMANDS_REQUEST, 
	DEMANDS_SUCCESS, 
	DEMANDS_FAILURE
} from "../actions/types"

const demands = createReducer(
	{}, 
	{
		DEMANDS_SUCCESS: fetchSuccessEntities
	}
)
export const demandsBuffered = createReducer(
	{}, 
	{
		DEMANDS_REQUEST: fetchRequest, 
		DEMANDS_SUCCESS: fetchSuccess, 
		DEMANDS_FAILURE: fetchFailure
	}
)
export const demandsPagination = paginate({
	mapActionToKey: action => action.key, 
	types: [
		DEMANDS_REQUEST, 
		DEMANDS_SUCCESS, 
		DEMANDS_FAILURE
	]
})

export default demands
