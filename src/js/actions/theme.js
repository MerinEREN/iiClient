import makeActionCreator from './creator'
import {
	CHANGE_THEME
} from './types'

// Action Creators
export const changeTheme = makeActionCreator(CHANGE_THEME)
