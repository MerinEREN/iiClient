import {combineReducers} from 'redux'
import createReducer, {mergeKeysIntoArray} from './utilities'
import {paginate} from './utilities'
import {
	ACCOUNTS_REQUEST,
	ACCOUNTS_SUCCESS,
	ACCOUNTS_FAILURE,
	USER_ACCOUNT_SUCCESS
} from '../actions/types'

// Case Reducers
function mergeById(state, action) {
	const {result} = action.response
	if(result.account)
		return {...state, ...result.account}
	return {...state, ...result}
}
function pushIds(state, action) {
	const {result} = action.response
	if(result.account) 
		return mergeKeysIntoArray(state, result.account)
	return mergeKeysIntoArray(state, result)
}

// Slice Reducer
const byId = createReducer(
	{}, 
	{
		USER_ACCOUNT_SUCCESS: mergeById, 
		ACCOUNTS_SUCCESS: mergeById
	}
)
const allIds = createReducer(
	[], 
	{
		USER_ACCOUNT_SUCCESS: pushIds, 
		ACCOUNTS_SUCCESS: pushIds
	}
)
export const accountsInPagination = paginate({
	mapActionToKey: action => action.groupID, 
	types: [
		ACCOUNTS_REQUEST, 
		ACCOUNTS_SUCCESS, 
		ACCOUNTS_FAILURE
	]
})

//Higher-Order Reducer
const accounts = combineReducers({
	byId,
	allIds
})

export default accounts

