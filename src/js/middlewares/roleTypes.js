import makeLoader from "./utilities"
import {
	roleTypesRequest, 
	roleTypesSuccess, 
	roleTypesFailure
} from "../actions/roleTypes"

const roleTypesGet = makeLoader({
	defaults: {
		URL: "/roleTypes", 
		kind: "roleTypes"
	},
	actionCreators: {
		actionsRequest: [roleTypesRequest],
		actionsSuccess: [roleTypesSuccess],
		actionsFailure: [roleTypesFailure]
	}, 
	options: {
		didValidate
	}
})
export const roleTypePost = makeLoader({
	defaults: {
		URL: "/roleTypes", 
		method: "POST", 
		headers: {
			"Accept": "application/json"
		}
	},
	actionCreators: {
		actionsRequest: [roleTypesRequest],
		actionsSuccess: [roleTypesSuccess],
		actionsFailure: [roleTypesFailure]
	}
})

export default roleTypesGet
