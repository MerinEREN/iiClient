import {
	setPartiallyOrResetAnObject
} from "./utilities"
import {
	COUNTER_SUCCESS
} from "../actions/types"

const counters = setPartiallyOrResetAnObject({
	mapActionToKey: action => action.key, 
	types: [
		COUNTER_SUCCESS
	]
})

export default counters
