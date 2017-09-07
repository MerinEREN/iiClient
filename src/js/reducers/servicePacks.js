import createReducer, {
	paginate, 
	mergeIntoOrRemoveFromObject
} from './utilities'
import {
	SERVICE_PACKS_REQUEST, 
	SERVICE_PACKS_SUCCESS, 
	SERVICE_PACKS_FAILURE
} from '../actions/types'

const servicePacks = createReducer(
	{}, 
	{
		SERVICE_PACKS_SUCCESS: mergeIntoOrRemoveFromObject, 
		SERVICE_PACKS_FAILURE: mergeIntoOrRemoveFromObject
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
