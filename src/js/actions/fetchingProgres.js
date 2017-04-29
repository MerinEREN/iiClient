import makeActionCreator from './creator'
import {
	TOGGLE_FETCHING
} from './types'

// Action Creators
export const toggleFetching = makeActionCreator(TOGGLE_FETCHING)
