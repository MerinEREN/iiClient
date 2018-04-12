// import {combineReducers} from 'redux'
import createReducer, {
	paginate, 
	entitiesBufferedReset
} from './utilities'
import {
	ACCOUNTS_REQUEST,
	ACCOUNTS_SUCCESS,
	ACCOUNTS_FAILURE,
	USER_ACCOUNT_SUCCESS
} from '../actions/types'

// Case Reducers
function mergeByID(state, action) {
	const {result} = action.response
	if(result.account)
		return {...state, ...result.account}
	return {...state, ...result}
}
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

const accounts = createReducer(
	{}, 
	{
		USER_ACCOUNT_SUCCESS: mergeByID, 
		ACCOUNTS_SUCCESS: mergeByID, 
	}
)

export const accountsBuffered = createReducer(
	{}, 
	{
		USER_ACCOUNT_SUCCESS: mergeByID, 
		ACCOUNTS_SUCCESS: mergeByID, 
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
