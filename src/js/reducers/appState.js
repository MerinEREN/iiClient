import {combineReducers} from 'redux'
import {isFetching} from './fetchingProgres'
import snackbarMessage from './snackbar'

// Higher-Order Reducer
const appState = combineReducers({
	isFetching, 
	snackbarMessage
})

export default appState
