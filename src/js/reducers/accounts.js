import createReducer, {
	paginate, 
	removeFromObjectIfDeleteOrMergeIntoOrResetObject, 
	mergeIntoOrRemoveFromObject, 
	mergeIntoOrResetObject, 
	fetchFailure
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
		ACCOUNTS_SUCCESS: removeFromObjectIfDeleteOrMergeIntoOrResetObject
	}
)
export const accountsBuffered = createReducer(
	{}, 
	{
		ACCOUNTS_REQUEST: mergeIntoOrRemoveFromObject, 
		ACCOUNTS_SUCCESS: mergeIntoOrResetObject, 
		ACCOUNTS_FAILURE: fetchFailure
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
