import makeActionCreator from './creator'
import {
	USER_ACCOUNT_REQUEST, 
	USER_ACCOUNT_SUCCESS, 
	USER_ACCOUNT_FAILURE
} from './types'

// Action Creators
// Don't effect anything for now.
export const userAccountRequest = makeActionCreator(
	USER_ACCOUNT_REQUEST
)
export const userAccountSuccess = makeActionCreator(
	USER_ACCOUNT_SUCCESS
)
// Don't effect anything for now.
export const userAccountFailure = makeActionCreator(
	USER_ACCOUNT_FAILURE
)
