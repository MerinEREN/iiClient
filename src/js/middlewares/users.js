import makeLoader from "./utilities"
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
		didValidate
	}
})
export const userPost = makeLoader({
	defaults: {
		method: "POST", 
		headers: {
			"Accept": "application/json"
		}
	},
	actionCreators: {
		actionsRequest: [usersRequest],
		actionsSuccess: [usersSuccess],
		actionsFailure: [usersFailure]
	}
})

export default usersGet
