import makeActionCreator from './creator'
import {
	USER_LOGGED_SUCCESS
} from './types'

// Action Creators
export const userLoggedSuccess = makeActionCreator(
	USER_LOGGED_SUCCESS
)
