import createReducer from "./utilities"
import {THEME_CHANGE} from "../actions/types" 
import getMuiTheme from "material-ui/styles/getMuiTheme"
import lightBaseTheme from "material-ui/styles/baseThemes/lightBaseTheme"
import darkBaseTheme from "material-ui/styles/baseThemes/darkBaseTheme"

function themeChange(state, action) {
	switch (action.cookies.get("theme")) {
		case "dark":
			action.cookies.set("theme", "light")
			return getMuiTheme(lightBaseTheme)
		default:
			action.cookies.set("theme", "dark")
			return getMuiTheme(darkBaseTheme)
	}
}

// Slice Reducer
const themeSelected = createReducer(
	{}, 
	{
		THEME_CHANGE: themeChange
	}
)

export default themeSelected
