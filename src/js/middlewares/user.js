import {makeLoader} from "./utilities"
import {
	userSuccess
} from "../actions/user"

const userGet = makeLoader({
	defaults: {
		kind: "users"
	}, 
	actionCreators: {
		actionsSuccess: [userSuccess]
	}
})
export const userPut = makeLoader({
	defaults: {
		method: "PUT", 
		headers: {
			"Accept": "application/json"
		}
	},
	actionCreators: {
		actionsSuccess: [userSuccess]
	}, 
	options: {
		showSnackbar: true, 
		mergeIntoState: true
	}
})

export default userGet
