import {makeLoader} from "./utilities"
import {
	userLoggedSuccess
} from "../actions/userLogged"

const userLoggedGet = makeLoader({
	defaults: {
		URL: "/users/"
	},
	actionCreators: {
		actionsSuccess: [userLoggedSuccess]
	}
})
export const userLoggedPut = makeLoader({
	defaults: {
		method: "PUT", 
		headers: {
			"Accept": "application/json"
		}
	},
	actionCreators: {
		actionsSuccess: [userLoggedSuccess]
	}, 
	options: {
		showSnackbar: true, 
		mergeIntoState: true
	}
})

export default userLoggedGet