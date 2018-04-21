import makeActionCreator from './creator'
import {
	USERS_REQUEST,
	USERS_SUCCESS,
	USERS_FAILURE
} from './types'

// Action Creators
export const usersRequest = makeActionCreator(
	USERS_REQUEST
)
export const usersSuccess = makeActionCreator(
	USERS_SUCCESS
)
export const usersFailure = makeActionCreator(
	USERS_FAILURE
)
