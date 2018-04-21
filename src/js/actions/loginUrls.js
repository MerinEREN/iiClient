import makeActionCreator from './creator'
import {
	LOGIN_URLS_SUCCESS
} from './types'

// Action Creators
export const loginUrlsSuccess = makeActionCreator(
	LOGIN_URLS_SUCCESS
)
