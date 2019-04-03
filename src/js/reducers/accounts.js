import createReducer, {
	paginate, 
	fetchRequest, 
	fetchSuccessEntities, 
	fetchSuccess, 
	fetchFailure
} from "./utilities"
import {
	ACCOUNTS_REQUEST,
	ACCOUNTS_SUCCESS,
	ACCOUNTS_FAILURE
} from "../actions/types"

// Slice Reducers
const accounts = createReducer(
	{}, 
	{
		ACCOUNTS_SUCCESS: fetchSuccessEntities
	}
)
export const accountsBuffered = createReducer(
	{}, 
	{
		ACCOUNTS_REQUEST: fetchRequest, 
		ACCOUNTS_SUCCESS: fetchSuccess, 
		ACCOUNTS_FAILURE: fetchFailure
	}
)
export const accountsPagination = paginate({
	mapActionToKey: action => action.key, 
	types: [
		ACCOUNTS_REQUEST, 
		ACCOUNTS_SUCCESS, 
		ACCOUNTS_FAILURE
	]
})

export default accounts
