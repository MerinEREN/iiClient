import {combineReducers} from "redux"
import {isFetching} from "./fetchingProgres"
import snackbars from "./snackbars"
import counters from "./counters"
import {languageIDsSelected as languageIDs} from "./languages"
import {pageIDsSelected as pageIDs} from "./pages"
import {contentIDsSelected as contentIDs} from "./contents"
import {userIDsSelected as userIDs} from "./users"
import {roleIDsSelectedByUser as roleIDsByUser} from "./roles"
import {tagIDsSelectedByUser as tagIDsByUser} from "./tags"

// Higher-Order Reducer
const appState = combineReducers({
	isFetching, 
	snackbars, 
	counters, 
	languageIDs, 
	pageIDs, 
	contentIDs, 
	userIDs, 
	roleIDsByUser, 
	tagIDsByUser
})

export default appState
