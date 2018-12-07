import {makeLoader} from "./utilities"
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
		didInvalidate: false
	}
})

export const roleTypesPost = makeLoader({
	defaults: {
		URL: "/roleTypes", 
		method: "POST", 
		headers: {
			"Accept": "application/json"
		}, 
		kind: "roleTypes"
	},
	actionCreators: {
		actionsRequest: [roleTypesRequest],
		actionsSuccess: [roleTypesSuccess],
		actionsFailure: [roleTypesFailure]
	}, 
	options: {
		hideFetching: true, 
		showSnackbar: true
	}
})

export const roleTypeDelete = makeLoader({
	defaults: {
		method: "DELETE", 
		kind: "roleTypes"
	},
	actionCreators: {
		actionsRequest: [roleTypesRequest],
		actionsSuccess: [roleTypesSuccess],
		actionsFailure: [roleTypesFailure]
	}, 
	options: {
		hideFetching: true, 
		showSnackbar: true
	}
})

export default roleTypesGet
