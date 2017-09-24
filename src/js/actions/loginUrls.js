import makeActionCreator from './creator'
import {
	LOGIN_URLS_REQUEST,
	LOGIN_URLS_SUCCESS,
	LOGIN_URLS_FAILURE
} from './types'

// Action Creators
export const loginUrlsRequest = makeActionCreator(
	LOGIN_URLS_REQUEST
)
export const loginUrlsSuccess = makeActionCreator(
	LOGIN_URLS_SUCCESS
)
export const loginUrlsFailure = makeActionCreator(
	LOGIN_URLS_FAILURE
)
