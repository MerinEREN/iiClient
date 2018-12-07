import {makeLoader} from "./utilities"
import {
	rolesRequest, 
	rolesSuccess, 
	rolesFailure
} from "../actions/roles"

const rolesGet = makeLoader({
	defaults: {
		URL: "/roles", 
		kind: "roles"
	},
	actionCreators: {
		actionsRequest: [rolesRequest],
		actionsSuccess: [rolesSuccess],
		actionsFailure: [rolesFailure]
	}, 
	options: {
		didInvalidate: false
	}
})

export const rolesPost = makeLoader({
	defaults: {
		URL: "/roles", 
		method: "POST", 
		headers: {
			"Accept": "application/json"
		}, 
		kind: "roles"
	},
	actionCreators: {
		actionsRequest: [rolesRequest],
		actionsSuccess: [rolesSuccess],
		actionsFailure: [rolesFailure]
	}, 
	options: {
		hideFetching: true, 
		showSnackbar: true
	}
})

export const roleDelete = makeLoader({
	defaults: {
		method: "DELETE", 
		kind: "roles"
	},
	actionCreators: {
		actionsRequest: [rolesRequest],
		actionsSuccess: [rolesSuccess],
		actionsFailure: [rolesFailure]
	}, 
	options: {
		hideFetching: true, 
		showSnackbar: true
	}
})

export default rolesGet
