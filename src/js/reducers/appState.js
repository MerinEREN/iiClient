import {combineReducers} from "redux"
import isFetching from "./fetchingProgres"
import snackbars from "./snackbars"
import {languageIDsSelected as languageIDs} from "./languages"
import {pageIDsSelected as pageIDs} from "./pages"
import {contentIDsSelected as contentIDs} from "./contents"
import {userIDsSelected as userIDs} from "./users"
import {roleIDsSelectedByKey as roleIDsByKey} from "./roles"
import {tagIDsSelectedByKey as tagIDsByKey} from "./tags"
import {photoIDsSelectedByKey as photoIDsByKey} from "./photos"

// Higher-Order Reducer
const appState = combineReducers({
	isFetching, 
	snackbars, 
	languageIDs, 
	pageIDs, 
	contentIDs, 
	userIDs, 
	roleIDsByKey, 
	tagIDsByKey, 
	photoIDsByKey
})

export default appState
