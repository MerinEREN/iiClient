import makeActionCreator from './creator'
import {
	COUNTER_TIMELINE_REQUEST, 
	COUNTER_TIMELINE_SUCCESS, 
	COUNTER_TIMELINE_FAILURE, 
	/* COUNTER_LANGUAGES_REQUEST, 
	COUNTER_LANGUAGES_SUCCESS, 
	COUNTER_LANGUAGES_FAILURE */
} from './types'

export const counterTimelineRequest = makeActionCreator(
	COUNTER_TIMELINE_REQUEST, 
	'groupID'
)
export const counterTimelineSuccess = makeActionCreator(
	COUNTER_TIMELINE_SUCCESS, 
	'response', 
	'receivedAt', 
	'groupID'
)
export const counterTimelineFailure = makeActionCreator(
	COUNTER_TIMELINE_FAILURE, 
	'error',  
	'groupID'
)

/* export const counterLanguagesRequest = makeActionCreator(
	COUNTER_LANGUAGES_REQUEST, 
	'groupID'
)
export const counterLanguagesSuccess = makeActionCreator(
	COUNTER_LANGUAGES_SUCCESS, 
	'response', 
	'receivedAt', 
	'groupID'
)
export const counterLanguagesFailure = makeActionCreator(
	COUNTER_LANGUAGES_FAILURE, 
	'error',  
	'groupID'
) */
