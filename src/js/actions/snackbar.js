import makeActionCreator from './creator'
import {SET_SNACKBAR, RESET_SNACKBAR} from './types'

// Action Creators
export const setSnackbar = makeActionCreator(
	SET_SNACKBAR
)
export const resetSnackbar = makeActionCreator(
	RESET_SNACKBAR
)
