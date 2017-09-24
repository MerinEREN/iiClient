import createReducer, {
	paginate, 
	mergeIntoOrRemoveFromObjectSuccess, 
	mergeIntoOrRemoveFromObjectFailure
} from './utilities'
import {
	SERVICE_PACKS_REQUEST, 
	SERVICE_PACKS_SUCCESS, 
	SERVICE_PACKS_FAILURE
} from '../actions/types'

const servicePacks = createReducer(
	{}, 
	{
		SERVICE_PACKS_SUCCESS: mergeIntoOrRemoveFromObjectSuccess, 
		SERVICE_PACKS_FAILURE: mergeIntoOrRemoveFromObjectFailure
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

export default servicePacks
