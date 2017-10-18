import makeActionCreator from './creator'
import {TOGGLE_DRAWER} from './types'

export const toggleDrawer = makeActionCreator(
	TOGGLE_DRAWER
)
