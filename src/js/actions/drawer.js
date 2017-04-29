import makeActionCreator from './creator'
import {
	TOGGLE_DRAWER
} from './types'

// Action Creators
export const toggleDrawer = makeActionCreator(TOGGLE_DRAWER)
