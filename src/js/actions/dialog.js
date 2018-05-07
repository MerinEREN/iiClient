import makeActionCreator from './creator'
import {SET_DIALOG, RESET_DIALOG} from './types'

// Action Creators
export const setDialog = makeActionCreator(
	SET_DIALOG
)
export const resetDialog = makeActionCreator(
	RESET_DIALOG
)

