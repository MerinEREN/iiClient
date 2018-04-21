import createReducer, {
	mergeIntoOrRemoveFromObjectRequest, 
	mergeIntoOrResetObject, 
	entitiesBufferedReset
} from './utilities'
import {
	USER_ACCOUNT_REQUEST, 
	USER_ACCOUNT_SUCCESS, 
	USER_ACCOUNT_FAILURE
} from '../actions/types'

// Slice Reducers
const userAccount = createReducer(
	{
		account: {}, 
		user: {}
	}, 
	{
		USER_ACCOUNT_SUCCESS: mergeIntoOrResetObject
	}
)
export const userAccountBuffered = createReducer(
	{}, 
	{
		USER_ACCOUNT_REQUEST: mergeIntoOrRemoveFromObjectRequest, 
		USER_ACCOUNT_SUCCESS: mergeIntoOrResetObject, 
		USER_ACCOUNT_FAILURE: entitiesBufferedReset
	}
)

export default userAccount

// import {combineReducers} from 'redux'
/* function pushIDs(state, action) {
	const {result} = action.response
	if(result.account) 
		return mergeKeysIntoArray(state, result.account)
	return mergeKeysIntoArray(state, result)
}

// Slice Reducer
const byID = createReducer(
	{}, 
	{
		USER_ACCOUNT_SUCCESS: mergeByID, 
		ACCOUNTS_SUCCESS: mergeByID
	}
)
const allIDs = createReducer(
	[], 
	{
		USER_ACCOUNT_SUCCESS: pushIDs, 
		ACCOUNTS_SUCCESS: pushIDs
	}
) */

//Higher-Order Reducer
/* const accounts = combineReducers({
	byID,
	allIDs
}) */
