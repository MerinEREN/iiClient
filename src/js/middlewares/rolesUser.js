import makeLoader from "./utilities"
import {
	rolesRequest, 
	rolesSuccess, 
	rolesFailure
} from "../actions/roles"

const rolesUserGet = makeLoader({
	defaults: {
		kind: "roles"
	},
	actionCreators: {
		actionsRequest: [rolesRequest],
		actionsSuccess: [rolesSuccess],
		actionsFailure: [rolesFailure]
	}, 
	options: {
		hideFetching, 
		didValidate
	}
})
export const rolesUserPost = makeLoader({
	defaults: {
		method: "POST", 
		kind: "roles"
	},
	actionCreators: {
		actionsRequest: [rolesRequest],
		actionsSuccess: [rolesSuccess],
		actionsFailure: [rolesFailure]
	}, 
	options: {
		ineffective, 
		showSnackbar
	}
})

export default rolesUserGet
