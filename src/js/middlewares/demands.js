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
		method: "POST"
		/*
		method: "POST", 
		headers: {
			"Content-Type": "application/json"
		}
		*/
	},
	actionCreators: {
		actionsRequest: [demandsRequest],
		actionsSuccess: [demandsSuccess],
		actionsFailure: [demandsFailure]
	}, 
	options: {
		showSnackbar
	}
})

export default demandsGet
