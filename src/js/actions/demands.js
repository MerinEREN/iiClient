import makeActionCreator from './creator'
import {
	DEMANDS_REQUEST, 
	DEMANDS_SUCCESS, 
	DEMANDS_FAILURE
} from './types'

// Action Creators
export const demandsRequest = makeActionCreator(
	DEMANDS_REQUEST, 
	'groupID'
)
export const demandsSuccess = makeActionCreator(
	DEMANDS_SUCCESS, 
	'response', 
	'receivedAt', 
	'groupID'
)
export const demandsFailure = makeActionCreator(
	DEMANDS_FAILURE, 
	'error', 
	'groupID', 
	'response'
)
