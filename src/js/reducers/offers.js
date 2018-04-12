import createReducer, {
	paginate, 
	mergeIntoOrRemoveFromObjectFetch, 
	mergeIntoOrResetObject, 
	entitiesBufferedReset
} from './utilities'
import {
	OFFERS_REQUEST, 
	OFFERS_SUCCESS, 
	OFFERS_FAILURE
} from '../actions/types'

const offers = createReducer(
	{}, 
	{
		OFFERS_SUCCESS: mergeIntoOrResetObject
	}
)
export const offersBuffered = createReducer(
	{}, 
	{
		OFFERS_REQUEST: mergeIntoOrRemoveFromObjectFetch, 
		OFFERS_SUCCESS: mergeIntoOrResetObject, 
		OFFERS_FAILURE: entitiesBufferedReset
	}
)
export const paginationOffers = paginate({
	mapActionToKey: action => action.key, 
	types: [
		OFFERS_REQUEST, 
		OFFERS_SUCCESS, 
		OFFERS_FAILURE
	]
})

export default offers
