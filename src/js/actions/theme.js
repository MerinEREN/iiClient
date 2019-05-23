import makeActionCreator from "./creator"
import {
	THEME_CHANGE
} from "./types"

// Action Creators
export const themeChange = makeActionCreator(
	THEME_CHANGE, 
	"cookies"
)
