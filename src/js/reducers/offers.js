import createReducer, {
	paginate, 
	mergeIntoOrRemoveFromObjectRequest, 
	removeFromObjectIfDeleteOrMergeIntoOrResetObject, 
	mergeIntoOrResetObject, 
	fetchFailure
} from './utilities'
import {
	OFFERS_REQUEST, 
	OFFERS_SUCCESS, 
	OFFERS_FAILURE
} from '../actions/types'

const offers = createReducer(
	{}, 
	{
		OFFERS_SUCCESS: removeFromObjectIfDeleteOrMergeIntoOrResetObject
	}
)
export const offersBuffered = createReducer(
	{}, 
	{
		OFFERS_REQUEST: mergeIntoOrRemoveFromObjectRequest, 
		OFFERS_SUCCESS: mergeIntoOrResetObject, 
		OFFERS_FAILURE: fetchFailure
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
