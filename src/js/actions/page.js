import makeActionCreator from './creator'
import {
	PAGE_SUCCESS, 
	PAGE_FAILURE
} from './types'

// Action Creators
export const pageSuccess = makeActionCreator(
	PAGE_SUCCESS
)
export const pageFailure = makeActionCreator(
	PAGE_FAILURE
)
