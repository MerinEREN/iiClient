import {makeLoader} from "./utilities"
import {
	userRolesRequest, 
	userRolesSuccess, 
	userRolesFailure
} from "../actions/userRoles"

const userRolesGet = makeLoader({
	actionCreators: {
		actionsSuccess: [userRolesSuccess]
	}, 
	options: {
		hideFetching: true
	}
})
export const userRolesPost = makeLoader({
	defaults: {
		method: "POST", 
		kind: "userRoles"
	},
	actionCreators: {
		actionsSuccess: [userRolesSuccess],
		actionsFailure: [userRolesFailure]
	}, 
	options: {
		hideFetching: true, 
		showSnackbar: true
	}
})

export const userRoleDelete = makeLoader({
	defaults: {
		method: "DELETE", 
		kind: "userRoles"
	},
	actionCreators: {
		actionsRequest: [userRolesRequest],
		actionsSuccess: [userRolesSuccess],
		actionsFailure: [userRolesFailure]
	}, 
	options: {
		hideFetching: true, 
		showSnackbar: true
	}
})

export default userRolesGet
