import createReducer, {
	mergeIntoOrRemoveFromObjectRequest, 
	removeFromObjectIfDeleteOrMergeIntoOrResetObject, 
	mergeIntoOrResetObject, 
	fetchFailure
} from "./utilities"
import {
	ACCOUNT_REQUEST, 
	ACCOUNT_SUCCESS, 
	ACCOUNT_FAILURE
} from "../actions/types"

// Slice Reducers
const account = createReducer(
	{}, 
	{
		ACCOUNT_SUCCESS: removeFromObjectIfDeleteOrMergeIntoOrResetObject
	}
)
export const accountBuffered = createReducer(
	{
		photo: {}, 
		user: {
			photo: {}, 
			roles: []
		}
	}, 
	{
		ACCOUNT_REQUEST: mergeIntoOrRemoveFromObjectRequest, 
		ACCOUNT_SUCCESS: mergeIntoOrResetObject, 
		ACCOUNT_FAILURE: fetchFailure
	}
)

export default account

// import {combineReducers} from "redux"
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
