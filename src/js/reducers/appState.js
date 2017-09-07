import {combineReducers} from 'redux'
import {isFetching} from './fetchingProgres'
import snackbar from './snackbar'

// Higher-Order Reducer
const appState = combineReducers({
	isFetching, 
	snackbar
})

export default appState
