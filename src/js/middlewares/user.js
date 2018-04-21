import {makeLoader} from "./utilities"
import {
	userSuccess
} from "../actions/user"

const getUser = makeLoader({
	actionCreators: {
		actionsSuccess: [userSuccess]
	}
})
export const putUser = makeLoader({
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

export default getUser
