import {addDynamicKeySetResetResetAll} from "./utilities"
import {
	APP_STATE_BUTTON_SET, 
	APP_STATE_BUTTON_RESET, 
	APP_STATE_BUTTON_RESETALL
} from "../actions/types"

export const clicked = addDynamicKeySetResetResetAll({
	mapActionToKey: action => action.key, 
	types: [
		APP_STATE_BUTTON_SET, 
		APP_STATE_BUTTON_RESET, 
		APP_STATE_BUTTON_RESETALL
	]
})
