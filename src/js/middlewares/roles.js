import makeLoader from "./utilities"
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
		didValidate
	}
})
export const rolePost = makeLoader({
	defaults: {
		URL: "/roles", 
		method: "POST", 
		headers: {
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
