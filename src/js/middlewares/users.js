import {makeLoader} from "./utilities"
import {
	usersRequest, 
	usersSuccess, 
	usersFailure
} from "../actions/users"

const getUsers = makeLoader({
	defaults: {
		URL: "/users", 
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
export const deleteUsers = makeLoader({
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
export const postUser = makeLoader({
	defaults: {
		method: "POST", 
		URL: "/users", 
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

export default getUsers
