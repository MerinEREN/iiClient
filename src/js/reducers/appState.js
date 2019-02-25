import {combineReducers} from "redux"
import {isFetching} from "./fetchingProgres"
import snackbars from "./snackbars"
import counters from "./counters"
import {languageIDsSelected as languageIDs} from "./languages"
import {pageIDsSelected as pageIDs} from "./pages"
import {contentIDsSelected as contentIDs} from "./contents"
import {userIDsSelected as userIDs} from "./users"
import {roleIDsSelectedByKey as roleIDsByKey} from "./roles"
import {tagIDsSelectedByKey as tagIDsByKey, tagsByFilter} from "./tags"

// Higher-Order Reducer
const appState = combineReducers({
	isFetching, 
	snackbars, 
	counters, 
	languageIDs, 
	pageIDs, 
	contentIDs, 
	userIDs, 
	roleIDsByKey, 
	tagIDsByKey, 
	tagsByFilter
})

export default appState
