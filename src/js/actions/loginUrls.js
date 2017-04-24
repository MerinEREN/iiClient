import makeActionCreator from './creator'
import {
	LOGIN_URLS_REQUEST,
	LOGIN_URLS_SUCCESS,
	LOGIN_URLS_FAILURE,
} from './types'

// Action Creators
const loginUrlsRequest = makeActionCreator(LOGIN_URLS_REQUEST)
const loginUrlsSuccess = makeActionCreator(
	LOGIN_URLS_SUCCESS,
	'response',
	'receivedAt'
)
const loginUrlsFailure = makeActionCreator(
	LOGIN_URLS_FAILURE,
	'error'
)
