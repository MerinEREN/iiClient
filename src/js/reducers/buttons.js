import {combineReducers} from 'redux'
import {clicked} from './clickedButtons'

// Higher-Order Reducer
const buttons = combineReducers({
	clicked
})

export default buttons
