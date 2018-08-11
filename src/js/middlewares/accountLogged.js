import {makeLoader} from "./utilities"
import {
	accountLoggedSuccess
} from "../actions/accountLogged"

const accountLoggedGet = makeLoader({
	defaults: {
		URL: "/accounts/"
	},
	actionCreators: {
		actionsSuccess: [accountLoggedSuccess]
	}
})
export const accountLoggedPut = makeLoader({
	defaults: {
		method: "PUT"
	},
	actionCreators: {
		actionsSuccess: [accountLoggedSuccess]
	}, 
	options: {
		showSnackbar: true, 
		mergeIntoState: true
	}
})

export default accountLoggedGet
