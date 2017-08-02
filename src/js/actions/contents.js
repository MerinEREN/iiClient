import makeActionCreator from './creator'
import {
	CONTENTS_REQUEST, 
	CONTENTS_SUCCESS, 
	CONTENTS_FAILURE
} from './types'

// Action Creators
export const contentsRequest = makeActionCreator(
	CONTENTS_REQUEST, 
	'groupID'
)
export const contentsSuccess = makeActionCreator(
	CONTENTS_SUCCESS, 
	'response', 
	'receivedAt', 
	'groupID'
)
export const contentsFailure = makeActionCreator(
	CONTENTS_FAILURE, 
	'error', 
	'groupID', 
	'response'
)
