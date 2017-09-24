import makeActionCreator from './creator'
import {
	OFFERS_REQUEST, 
	OFFERS_SUCCESS, 
	OFFERS_FAILURE
} from './types'

// Action Creators
export const offersRequest = makeActionCreator(
	OFFERS_REQUEST
)
export const offersSuccess = makeActionCreator(
	OFFERS_SUCCESS
)
export const offersFailure = makeActionCreator(
	OFFERS_FAILURE
)
