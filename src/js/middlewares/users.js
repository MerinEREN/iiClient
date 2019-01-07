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
		didInvalidate: false, 
		isCached: (state) => Object.keys(state.entitiesBuffered.users).length
	}
})
export const userPost = makeLoader({
	defaults: {
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
export const userDelete = makeLoader({
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

export default usersGet
