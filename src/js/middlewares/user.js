import makeLoader from "./utilities"
import {
	usersRequest, 
	usersSuccess, 
	usersFailure
} from "../actions/users"

const userGet = makeLoader({
	defaults: {
		kind: "users"
	}, 
	actionCreators: {
		actionsRequest: [usersRequest], 
		actionsSuccess: [usersSuccess], 
		actionsFailure: [usersFailure]
	}, 
	options: {
		didValidate
	}
})
export const userPut = makeLoader({
	defaults: {
		method: "PUT", 
		headers: {
			"Accept": "application/json"
		}, 
		kind: "users"
	},
	actionCreators: {
		actionsRequest: [usersRequest], 
		actionsSuccess: [usersSuccess], 
		actionsFailure: [usersFailure]
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
		hideFetching
	}
})

export default userGet
