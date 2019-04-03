import makeLoader from "./utilities"
import {
	demandsRequest, 
	demandsSuccess, 
	demandsFailure
} from "../actions/demands"

const demandGet = makeLoader({
	defaults: {
		kind: "demands"
	},
	actionCreators: {
		actionsRequest: [demandsRequest], 
		actionsSuccess: [demandsSuccess], 
		actionsFailure: [demandsFailure]
	}, 
	options: {
		didValidate
	}
})
export const demandPut = makeLoader({
	defaults: {
		method: "PUT", 
		headers: {
			"Accept": "application/json"
		}, 
		kind: "demands"
	},
	actionCreators: {
		actionsRequest: [demandsRequest], 
		actionsSuccess: [demandsSuccess], 
		actionsFailure: [demandsFailure]
	}
})
export const demandDelete = makeLoader({
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
		hideFetching
	}
})

export default demandGet
