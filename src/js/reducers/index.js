import {combineReducers} from 'redux'
import pagination from './pagination'
import entities from './entities'
import entitiesBuffered from './entitiesBuffered'
import appState from './appState'
import ui from './ui'

// Root Reducer
const rootReducer = combineReducers({
	// Domain Data
	pagination,
	entities,
	entitiesBuffered, 
	// App State
	appState, 
	// UI State
	ui
})

export default rootReducer
