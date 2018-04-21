import {addDynamicKeyReturnResult} from "./utilities"
import {
	COUNTER_SUCCESS
} from "../actions/types"

const counters = addDynamicKeyReturnResult({
	mapActionToKey: action => action.key, 
	types: [
		COUNTER_SUCCESS
	]
})

export default counters
