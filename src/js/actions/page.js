import makeActionCreator from './creator'
import {
	PAGE_POST_REQUEST, 
	PAGE_POST_SUCCESS, 
	PAGE_POST_FAILURE
} from './types'

// Action Creators
export const pagePostRequest = makeActionCreator(
	PAGE_POST_REQUEST, 
)
export const pagePostSuccess = makeActionCreator(
	PAGE_POST_SUCCESS, 
	'response', 
	'receivedAt'
)
export const pagePostFailure = makeActionCreator(
	PAGE_POST_FAILURE, 
	'error'
)


