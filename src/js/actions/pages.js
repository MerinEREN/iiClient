import makeActionCreator from './creator'
import {
	PAGES_REQUEST, 
	PAGES_SUCCESS, 
	PAGES_FAILURE
} from './types'

// Action Creators
export const pagesRequest = makeActionCreator(
	PAGES_REQUEST
)
export const pagesSuccess = makeActionCreator(
	PAGES_SUCCESS
)
export const pagesFailure = makeActionCreator(
	PAGES_FAILURE
)

