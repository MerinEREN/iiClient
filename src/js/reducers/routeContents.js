import {addDynamicKeyReturnResult} from "./utilities"

import {
	ROUTE_CONTENTS_SUCCESS, 
	ROUTE_CONTENTS_RESET_ALL
} from "../actions/types"

// Slice Reducer
const contentsByPage = addDynamicKeyReturnResult({
	mapActionToKey: action => action.key, 
	types: [
		ROUTE_CONTENTS_SUCCESS, 
		ROUTE_CONTENTS_RESET_ALL
	]

})

export default contentsByPage
