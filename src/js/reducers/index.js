import {combineReducers} from 'redux'
import loginUrls from './loginUrls'
import signOutURL from './signOutURL'
import pagination from './pagination'
import entities from './entities'
import appState from './appState'
import ui from './ui'

// Root Reducer
const rootReducer = combineReducers({
	// Domain Data
	loginUrls,
	signOutURL, 
	pagination,
	entities,
	// App State
	appState, 
	// UI State
	ui
})

export default rootReducer
