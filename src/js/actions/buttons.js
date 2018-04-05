import makeActionCreator from './creator'
import {
	APP_STATE_BUTTON_SET, 
	APP_STATE_BUTTON_RESET, 
	APP_STATE_BUTTON_RESETALL
} from './types'

// Action Creators
export const buttonSet = makeActionCreator(
	APP_STATE_BUTTON_SET, 
	'key'
)

export const buttonReset = makeActionCreator(
	APP_STATE_BUTTON_RESET, 
	'key'
)
export const buttonResetAll = makeActionCreator(
	APP_STATE_BUTTON_RESETALL
)
