import {makeLoader} from "./utilities"
import {
	demandsRequest, 
	demandsSuccess, 
	demandsFailure
} from "../actions/demands"

const getDemands = makeLoader({
	defaults: {
		URL: "/demands", 
		kind: "demands"
	},
	actionCreators: {
		actionsRequest: [demandsRequest],
		actionsSuccess: [demandsSuccess],
		actionsFailure: [demandsFailure]
	}
	})
export const postDemand = makeLoader({
	defaults: {
		method: "POST", 
		URL: "/demands", 
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
export default getDemands
