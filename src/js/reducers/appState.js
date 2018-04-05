import {combineReducers} from 'redux'
import {isFetching} from './fetchingProgres'
import snackbar from './snackbar'
import {languagesSelected as languages} from './languages'
import {contentsSelected as contents} from './contents'
import buttons from './buttons'

// Higher-Order Reducer
const appState = combineReducers({
	isFetching, 
	snackbar, 
	languages, 
	contents, 
	buttons
})

export default appState
