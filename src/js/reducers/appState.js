import {combineReducers} from 'redux'
import {isFetching} from './fetchingProgres'
import dialog from './dialog'
import snackbar from './snackbar'
import counters from './counters'
import buttons from './buttons'
import {languageIDsSelected as languageIDs} from './languages'
import {pageIDsSelected as pageIDs} from './pages'
import {contentIDsSelected as contentIDs} from './contents'

// Higher-Order Reducer
const appState = combineReducers({
	isFetching, 
	dialog, 
	snackbar, 
	counters, 
	buttons, 
	languageIDs, 
	pageIDs, 
	contentIDs
})

export default appState
