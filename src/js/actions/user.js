import makeActionCreator from './creator'
import {
	USER_SUCCESS
} from './types'

// Action Creators
export const userSuccess = makeActionCreator(
	USER_SUCCESS
)
