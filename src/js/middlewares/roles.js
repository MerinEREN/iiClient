import makeLoader from "./utilities"
import {
	rolesRequest, 
	rolesSuccess, 
	rolesFailure
} from "../actions/roles"

const URL = new URL("/roles", window.location.href)

const rolesGet = makeLoader({
	defaults: {
		URL, 
		kind: "roles"
	},
	actionCreators: {
		actionsRequest: [rolesRequest],
		actionsSuccess: [rolesSuccess],
		actionsFailure: [rolesFailure]
	}, 
	options: {
		didValidate
	}
})
export const rolePost = makeLoader({
	defaults: {
		URL, 
		method: "POST", 
		headers: {
			"Content-Type": "application/json", 
			"Accept": "application/json"
		}
	},
	actionCreators: {
		actionsRequest: [rolesRequest],
		actionsSuccess: [rolesSuccess],
		actionsFailure: [rolesFailure]
	}
})

export default rolesGet
