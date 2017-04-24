import makeActionCreator from './creator'
import {
	USERS_REQUEST,
	USERS_SUCCESS,
	USERS_FAILURE,
} from './types'

// Action Creators
export const usersRequest = makeActionCreator(
	USERS_REQUEST, 
	'groupID'
)
export const usersSuccess = makeActionCreator(
	USERS_SUCCESS,
	'response',
	'receivedAt', 
	'groupID'
)
export const usersFailure = makeActionCreator(
	USERS_FAILURE,
	'error', 
	'groupID'
)
