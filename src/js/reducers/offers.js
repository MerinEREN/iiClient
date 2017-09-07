import createReducer, {
	paginate, 
	mergeIntoOrRemoveFromObject
} from './utilities'
import {
	OFFERS_REQUEST, 
	OFFERS_SUCCESS, 
	OFFERS_FAILURE
} from '../actions/types'

const offers = createReducer(
	{}, 
	{
		OFFERS_SUCCESS: mergeIntoOrRemoveFromObject, 
		OFFERS_FAILURE: mergeIntoOrRemoveFromObject
	}
)
export const paginationOffers = paginate({
	mapActionToKey: action => action.groupID, 
	types: [
		OFFERS_REQUEST, 
		OFFERS_SUCCESS, 
		OFFERS_FAILURE
	]
})

export default offers
