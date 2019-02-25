import {makeLoader} from "./utilities"
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
export const demandsDelete = makeLoader({
	defaults: {
		method: "DELETE", 
		kind: "demands"
	},
	actionCreators: {
		actionsRequest: [demandsRequest],
		actionsSuccess: [demandsSuccess],
		actionsFailure: [demandsFailure]
	}, 
	options: {
		hideFetching: true, 
		showSnackbar: true
	}
})
export const demandPost = makeLoader({
	defaults: {
		method: "POST"
	},
	options: {
		hideFetching: true, 
		showSnackbar: true
	}
})

export default demandsGet
