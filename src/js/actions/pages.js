import makeActionCreator from './creator'
import {
	PAGES_REQUEST, 
	PAGES_SUCCESS, 
	PAGES_FAILURE
} from './types'

// Action Creators
export const pagesRequest = makeActionCreator(
	PAGES_REQUEST, 
	'groupID'
)
export const pagesSuccess = makeActionCreator(
	PAGES_SUCCESS, 
	'response', 
	'receivedAt', 
	'groupID', 
	'didInvalidate'
)
export const pagesFailure = makeActionCreator(
	PAGES_FAILURE, 
	'error', 
	'groupID', 
	'response'
)

