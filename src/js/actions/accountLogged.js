import makeActionCreator from './creator'
import {
	ACCOUNT_LOGGED_SUCCESS
} from './types'

// Action Creators
export const accountLoggedSuccess = makeActionCreator(
	ACCOUNT_LOGGED_SUCCESS
)
