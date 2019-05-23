import {combineReducers} from "redux"
import isFetching from "./fetchingProgres"
import snackbars from "./snackbars"
import {languageIDsSelected} from "./languages"
import {pageIDsSelected} from "./pages"
import {contextIDsSelected} from "./contexts"
import {userIDsSelected} from "./users"
import {roleIDsSelectedByKey} from "./roles"
import {tagIDsSelectedByKey} from "./tags"
import {photoIDsSelectedByKey} from "./photos"

// Higher-Order Reducer
const appState = combineReducers({
	isFetching, 
	snackbars, 
	languageIDsSelected, 
	pageIDsSelected, 
	contextIDsSelected, 
	userIDsSelected, 
	roleIDsSelectedByKey, 
	tagIDsSelectedByKey, 
	photoIDsSelectedByKey
})

export default appState
