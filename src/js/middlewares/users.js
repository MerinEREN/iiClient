import {makeLoader} from "./utilities"
import {
	usersRequest, 
	usersSuccess, 
	usersFailure
} from "../actions/users"

const usersGet = makeLoader({
	defaults: {
		kind: "users"
	},
	actionCreators: {
		actionsRequest: [usersRequest],
		actionsSuccess: [usersSuccess],
		actionsFailure: [usersFailure]
	}, 
	options: {
		didInvalidate: false
	}
})
export const usersDelete = makeLoader({
	defaults: {
		method: "DELETE", 
		kind: "users"
	},
	actionCreators: {
		actionsRequest: [usersRequest],
		actionsSuccess: [usersSuccess],
		actionsFailure: [usersFailure]
	}, 
	options: {
		hideFetching: true, 
		showSnackbar: true
	}
})
export const userPost = makeLoader({
	defaults: {
		URL: "/users", 
		method: "POST", 
		headers: {
			"Accept": "application/json"
		}, 
		kind: "users"
	},
	actionCreators: {
		actionsRequest: [usersRequest],
		actionsSuccess: [usersSuccess],
		actionsFailure: [usersFailure]
	}, 
	options: {
		hideFetching: true, 
		showSnackbar: true
	}
})

export default usersGet
