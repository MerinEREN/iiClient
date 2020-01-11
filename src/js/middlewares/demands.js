import makeLoader from "./utilities"
import {
	demandsRequest, 
	demandsSuccess, 
	demandsFailure
} from "../actions/demands"

const demandsGet = makeLoader({
	defaults: {
		kind: "demands"
	},
	actionCreators: {
		actionsRequest: [demandsRequest],
		actionsSuccess: [demandsSuccess],
		actionsFailure: [demandsFailure]
	}
})
export const demandPost = makeLoader({
	defaults: {
		method: "POST", 
		headers: {
			// "Content-Type": "application/json"
			"Accept": "application/json"
		}
	},
	actionCreators: {
		actionsRequest: [demandsRequest],
		actionsSuccess: [demandsSuccess],
		actionsFailure: [demandsFailure]
	}
})

export default demandsGet
