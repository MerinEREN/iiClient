import {paginate} from './utilities'
import {
	COUNTER_LANGUAGES_REQUEST, 
	COUNTER_LANGUAGES_SUCCESS, 
	COUNTER_LANGUAGES_FAILURE
} from '../actions/types'

const languages = paginate({
	mapActionToKey: action => action.key, 
	types: [
		COUNTER_LANGUAGES_REQUEST, 
		COUNTER_LANGUAGES_SUCCESS, 
		COUNTER_LANGUAGES_FAILURE
	]
})

export default languages
