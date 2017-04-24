import makeActionCreator from './creator'
import {
	COUNTER_REQUEST, 
	COUNTER_SUCCESS, 
	COUNTER_FAILURE
} from './types'

export const counterRequest = makeActionCreator(
	COUNTER_REQUEST, 
	'groupID'
)
export const counterSuccess = makeActionCreator(
	COUNTER_SUCCESS, 
	'response', 
	'receivedAt', 
	'groupID'
)
export const counterFailure = makeActionCreator(
	COUNTER_FAILURE, 
	'error',  
	'groupID'
)
