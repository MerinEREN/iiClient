import createReducer, {
	paginate, 
	mergeIntoOrRemoveFromObject, 
	removeFromObjectIfDeleteOrMergeIntoOrResetObject, 
	mergeIntoOrResetObject, 
	fetchFailure
} from "./utilities"
import {
	OFFERS_REQUEST, 
	OFFERS_SUCCESS, 
	OFFERS_FAILURE
} from "../actions/types"
import offer, {offerBuffered} from "./offer"

const offers = createReducer(
	{}, 
	{
		OFFERS_SUCCESS: removeFromObjectIfDeleteOrMergeIntoOrResetObject, 
		...offer
	}
)
export const offersBuffered = createReducer(
	{}, 
	{
		OFFERS_REQUEST: mergeIntoOrRemoveFromObject, 
		OFFERS_SUCCESS: mergeIntoOrResetObject, 
		OFFERS_FAILURE: fetchFailure, 
		...offerBuffered
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
