import createReducer, {
	mergeIntoOrRemoveFromObjectRequest, 
	removeFromObjectIfDeleteOrMergeIntoOrResetObject, 
	mergeIntoOrResetObject, 
	fetchFailure
} from "./utilities"
import {
	ACCOUNT_LOGGED_REQUEST, 
	ACCOUNT_LOGGED_SUCCESS, 
	ACCOUNT_LOGGED_FAILURE
} from "../actions/types"

// Slice Reducers
const accountLogged = createReducer(
	{}, 
	{
		ACCOUNT_LOGGED_SUCCESS: removeFromObjectIfDeleteOrMergeIntoOrResetObject
	}
)
export const accountLoggedBuffered = createReducer(
	{
		photo: {}
	}, 
	{
		ACCOUNT_LOGGED_REQUEST: mergeIntoOrRemoveFromObjectRequest, 
		ACCOUNT_LOGGED_SUCCESS: mergeIntoOrResetObject, 
		ACCOUNT_LOGGED_FAILURE: fetchFailure
	}
)

export default accountLogged
