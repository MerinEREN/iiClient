import makeActionCreator from './creator'
import {
	SIGN_OUT_URL_SUCCESS
} from './types'

// Action Creators
export const signOutURLSuccess = makeActionCreator(
	SIGN_OUT_URL_SUCCESS
)
