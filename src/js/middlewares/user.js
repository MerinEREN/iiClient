import {makeLoader} from "./utilities"
import {
	userSuccess
} from "../actions/user"

const userGet = makeLoader({
	defaults: {
		URL: "/users/"
	},
	actionCreators: {
		actionsSuccess: [userSuccess]
	}
})
export const userPut = makeLoader({
	defaults: {
		method: "PUT"
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
