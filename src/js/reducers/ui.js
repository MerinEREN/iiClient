import {combineReducers} from "redux"
import selectedTheme from "./theme"
import contentsByPage from "./routeContents"
import {openDrawer} from "./drawer"

// Higher-Order Reducer
const ui = combineReducers({
	selectedTheme,
	contentsByPage, 
	openDrawer
})

export default ui
