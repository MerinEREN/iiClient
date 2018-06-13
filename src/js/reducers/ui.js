import {combineReducers} from "redux"
import selectedTheme from "./theme"
import contents from "./routeContents"
import {openDrawer} from "./drawer"

// Higher-Order Reducer
const ui = combineReducers({
	selectedTheme,
	contents, 
	openDrawer
})

export default ui
