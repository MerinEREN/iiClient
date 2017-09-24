import makeActionCreator from './creator'
import {
	ACCOUNTS_REQUEST,
	ACCOUNTS_SUCCESS,
	ACCOUNTS_FAILURE,
} from './types'

// Action Creators
export const accountsRequest = makeActionCreator(
	ACCOUNTS_REQUEST
)
export const accountsSuccess = makeActionCreator(
	ACCOUNTS_SUCCESS
)
export const accountsFailure = makeActionCreator(
	ACCOUNTS_FAILURE
)
