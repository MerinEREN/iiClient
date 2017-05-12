import makeActionCreator from './creator'
import {
	SIGN_OUT_REQUEST,
	SIGN_OUT_SUCCESS,
	SIGN_OUT_FAILURE
} from './types'

// Action Creators
export const signOutRequest = makeActionCreator(SIGN_OUT_REQUEST)
export const signOutSuccess = makeActionCreator(
	SIGN_OUT_SUCCESS,
	'response',
	'receivedAt'
)
export const signOutFailure = makeActionCreator(
	SIGN_OUT_FAILURE,
	'error'
)

