import createReducer, {
	paginate, 
	fetchRequest, 
	fetchSuccessEntities, 
	fetchSuccess, 
	fetchFailure
} from "./utilities"
import {
	OFFERS_REQUEST, 
	OFFERS_SUCCESS, 
	OFFERS_FAILURE
} from "../actions/types"

const offers = createReducer(
	{}, 
	{
		OFFERS_SUCCESS: fetchSuccessEntities
	}
)
export const offersBuffered = createReducer(
	{}, 
	{
		OFFERS_REQUEST: fetchRequest, 
		OFFERS_SUCCESS: fetchSuccess, 
		OFFERS_FAILURE: fetchFailure
	}
)
export const offersPagination = paginate({
	mapActionToKey: action => action.key, 
	types: [
		OFFERS_REQUEST, 
		OFFERS_SUCCESS, 
		OFFERS_FAILURE
	]
})

export default offers
