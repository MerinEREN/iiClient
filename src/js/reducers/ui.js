import {combineReducers} from 'redux'
import selectedTheme from './theme'
import {openDrawer} from './body'

// Higher-Order Reducer
const ui = combineReducers({
	selectedTheme,
	openDrawer
})

export default ui
