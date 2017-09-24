import makeActionCreator from './creator'
import {
	SIGN_OUT_URL_REQUEST,
	SIGN_OUT_URL_SUCCESS,
	SIGN_OUT_URL_FAILURE
} from './types'

// Action Creators
export const signOutURLRequest = makeActionCreator(
	SIGN_OUT_URL_REQUEST
)
export const signOutURLSuccess = makeActionCreator(
	SIGN_OUT_URL_SUCCESS
)
export const signOutURLFailure = makeActionCreator(
	SIGN_OUT_URL_FAILURE
)

