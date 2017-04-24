import {paginate} from './utilities'
import {
	COUNTER_REQUEST, 
	COUNTER_SUCCESS, 
	COUNTER_FAILURE
} from '../actions/types'

const counters = paginate({
	mapActionToKey: action => action.groupID, 
	types: [
		COUNTER_REQUEST, 
		COUNTER_SUCCESS, 
		COUNTER_FAILURE
	]
})

export default counters
