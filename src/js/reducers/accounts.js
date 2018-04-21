import createReducer, {
	paginate, 
	mergeIntoOrRemoveFromObjectRequest, 
	mergeIntoOrResetObject, 
	entitiesBufferedReset
} from './utilities'
import {
	ACCOUNTS_REQUEST,
	ACCOUNTS_SUCCESS,
	ACCOUNTS_FAILURE
} from '../actions/types'

// Slice Reducers
const accounts = createReducer(
	{}, 
	{
		ACCOUNTS_SUCCESS: mergeIntoOrResetObject
	}
)
export const accountsBuffered = createReducer(
	{}, 
	{
		ACCOUNTS_REQUEST: mergeIntoOrRemoveFromObjectRequest, 
		ACCOUNTS_SUCCESS: mergeIntoOrResetObject, 
		ACCOUNTS_FAILURE: entitiesBufferedReset
	}
)
export const paginationAccounts = paginate({
	mapActionToKey: action => action.key, 
	types: [
		ACCOUNTS_REQUEST, 
		ACCOUNTS_SUCCESS, 
		ACCOUNTS_FAILURE
	]
})

export default accounts
