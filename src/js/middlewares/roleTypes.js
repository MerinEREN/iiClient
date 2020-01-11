import makeLoader from "./utilities"
import {
	roleTypesRequest, 
	roleTypesSuccess, 
	roleTypesFailure
} from "../actions/roleTypes"

const URL = new URL("/roleTypes", window.location.href)

const roleTypesGet = makeLoader({
	defaults: {
		URL, 
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
		URL, 
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
