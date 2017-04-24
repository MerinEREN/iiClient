import makeActionCreator from './creator'
import {
	USER_ACCOUNT_REQUEST, 
	USER_ACCOUNT_SUCCESS, 
	USER_ACCOUNT_FAILURE, 
	CHANGE_THEME,
	TOGGLE_DRAWER,
	TOGGLE_FETCHING
} from './types'

// Action Creators
export const changeTheme = makeActionCreator(CHANGE_THEME)
export const toggleDrawer = makeActionCreator(TOGGLE_DRAWER)
export const toggleFetching = makeActionCreator(TOGGLE_FETCHING)
// Don't effect anything for now.
export const userAccountRequest = makeActionCreator(
	USER_ACCOUNT_REQUEST
)
export const userAccountSuccess = makeActionCreator(
	USER_ACCOUNT_SUCCESS, 
	'response', 
	'receivedAt'
)
// Don't effect anything for now.
export const userAccountFailure = makeActionCreator(
	USER_ACCOUNT_FAILURE, 
	'error'
)
