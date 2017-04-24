import makeActionCreator from './creator'
import {
	SERVICE_PACKS_REQUEST, 
	SERVICE_PACKS_SUCCESS, 
	SERVICE_PACKS_FAILURE
} from './types'

// Action Creators
export const servicePacksRequest = makeActionCreator(
	SERVICE_PACKS_REQUEST, 
	'groupID'
)
export const servicePacksSuccess = makeActionCreator(
	SERVICE_PACKS_SUCCESS, 
	'response', 
	'receivedAt', 
	'groupID'
)
export const servicePacksFailure = makeActionCreator(
	SERVICE_PACKS_FAILURE, 
	'error', 
	'groupID'
)
