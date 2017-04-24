import {combineReducers} from 'redux'
import counters from './counters'
import errorMsg from './errorMsg'
import loginUrls from './loginUrls'
import {isFetching} from './body'
import pagination from './pagination'
import entities from './entities'
import ui from './ui'

// Root Reducer
const rootReducer = combineReducers({
	// App State
	isFetching, 
	// Domain Data
	counters, 
	errorMsg, 
	loginUrls,
	pagination,
	entities,
	// UI State
	ui
})

export default rootReducer
