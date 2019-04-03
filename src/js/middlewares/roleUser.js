import makeLoader from "./utilities"
import {
	rolesRequest, 
	rolesSuccess, 
	rolesFailure
} from "../actions/roles"

export const roleUserDelete = makeLoader({
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
		ineffective, 
		hideFetching
	}
})
