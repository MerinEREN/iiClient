import makeActionCreator from './creator'
import {ADD_SNACKBAR, REMOVE_SNACKBAR} from './types'

// Action Creators
export const addSnackbar = makeActionCreator(
	ADD_SNACKBAR
)
export const removeSnackbar = makeActionCreator(
	REMOVE_SNACKBAR
)
