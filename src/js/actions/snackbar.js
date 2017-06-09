import makeActionCreator from './creator'
import {SET_SNACKBAR_MESSAGE} from './types'

export const setSnackbarMessage = makeActionCreator(
	SET_SNACKBAR_MESSAGE, 
	"msg"
)
