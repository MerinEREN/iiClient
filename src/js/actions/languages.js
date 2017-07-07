import makeActionCreator from './creator'
import {
	LANGUAGES_REQUEST, 
	LANGUAGES_SUCCESS, 
	LANGUAGES_FAILURE
} from './types'

// Action Creators
export const languagesRequest = makeActionCreator(
	LANGUAGES_REQUEST, 
	'groupID'
)
export const languagesSuccess = makeActionCreator(
	LANGUAGES_SUCCESS, 
	'response', 
	'receivedAt', 
	'groupID'
)
export const languagesFailure = makeActionCreator(
	LANGUAGES_FAILURE, 
	'error', 
	'groupID', 
	'response'
)


