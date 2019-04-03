import {combineReducers} from "redux"
import themeSelected from "./theme"
import drawerOpen from "./drawer"

// Higher-Order Reducer
const ui = combineReducers({
	themeSelected,
	drawerOpen
})

export default ui
