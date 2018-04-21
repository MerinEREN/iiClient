import {makeLoader} from "./utilities"
import {
	userAccountSuccess
} from "../actions/userAccount"

const getUserAccount = makeLoader({
	actionCreators: {
		actionsSuccess: [userAccountSuccess]
	}
})
export const putUserAccount = makeLoader({
	defaults: {
		method: "PUT"
	},
	actionCreators: {
		actionsSuccess: [userAccountSuccess]
	}, 
	options: {
		showSnackbar: true, 
		mergeIntoState: true
	}
})

export default getUserAccount
