import createReducer, {
	paginate, 
	fetchRequest, 
	fetchSuccessEntities, 
	fetchSuccess, 
	fetchFailure
} from "./utilities"
import {
	SERVICE_PACKS_REQUEST, 
	SERVICE_PACKS_SUCCESS, 
	SERVICE_PACKS_FAILURE
} from "../actions/types"

const servicePacks = createReducer(
	{}, 
	{
		SERVICE_PACKS_SUCCESS: fetchSuccessEntities
	}
)
export const servicePacksBuffered = createReducer(
	{}, 
	{
		SERVICE_PACKS_REQUEST: fetchRequest, 
		SERVICE_PACKS_SUCCESS: fetchSuccess, 
		SERVICE_PACKS_FAILURE: fetchFailure
	}
)
export const servicePacksPagination = paginate({
	mapActionToKey: action => action.key, 
	types: [
		SERVICE_PACKS_REQUEST, 
		SERVICE_PACKS_SUCCESS, 
		SERVICE_PACKS_FAILURE
	]
})

export default servicePacks
