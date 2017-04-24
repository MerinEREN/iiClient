import makeActionCreator from './creator'
import {SET_ERROR_MESSAGE} from './types'

export const setErrorMessage = makeActionCreator(
	SET_ERROR_MESSAGE, 
	"error"
)
