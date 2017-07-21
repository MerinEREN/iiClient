import {paginate} from './utilities'
import {
	COUNTER_TIMELINE_REQUEST, 
	COUNTER_TIMELINE_SUCCESS, 
	COUNTER_TIMELINE_FAILURE
} from '../actions/types'

const timeline = paginate({
	mapActionToKey: action => action.groupID, 
	types: [
		COUNTER_TIMELINE_REQUEST, 
		COUNTER_TIMELINE_SUCCESS, 
		COUNTER_TIMELINE_FAILURE, 
	]
})

export default timeline
