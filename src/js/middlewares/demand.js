import {makeLoader} from "./utilities"
import {
	demandSuccess
} from "../actions/demand"

const demandGet = makeLoader({
	actionCreators: {
		actionsSuccess: [demandSuccess]
	}
})
export const demandPut = makeLoader({
	defaults: {
		method: "PUT", 
		headers: {
			"Accept": "application/json"
		}
	},
	actionCreators: {
		actionsSuccess: [demandSuccess]
	}, 
	options: {
		showSnackbar: true, 
		mergeIntoState: true
	}
})

export default demandGet
