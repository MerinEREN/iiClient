import {combineReducers} from 'redux'
import timeline from './countersTimeline'
import languages from './countersLanguages'

const counters = combineReducers({
	timeline, 
	languages
})
export default counters
