import createReducer, {
	paginate, 
	mergeIntoOrRemoveFromObjectRequest, 
	removeFromObjectIfDeleteOrMergeIntoOrResetObject, 
	mergeIntoOrResetObject, 
	fetchFailure
} from './utilities'
import {
	SERVICE_PACKS_REQUEST, 
	SERVICE_PACKS_SUCCESS, 
	SERVICE_PACKS_FAILURE
} from '../actions/types'

const servicePacks = createReducer(
	{}, 
	{
		SERVICE_PACKS_SUCCESS: removeFromObjectIfDeleteOrMergeIntoOrResetObject
	}
)
export const servicePacksBuffered = createReducer(
	{}, 
	{
		SERVICE_PACKS_REQUEST: mergeIntoOrRemoveFromObjectRequest, 
		SERVICE_PACKS_SUCCESS: mergeIntoOrResetObject, 
		SERVICE_PACKS_FAILURE: fetchFailure
	}
)
export const paginationServicePacks = paginate({
	mapActionToKey: action => action.key, 
	types: [
		SERVICE_PACKS_REQUEST, 
		SERVICE_PACKS_SUCCESS, 
		SERVICE_PACKS_FAILURE
	]
})

export default servicePacks
