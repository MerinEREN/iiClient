import {makeLoader} from "./utilities"
import {
	accountSuccess
} from "../actions/account"

const accountGet = makeLoader({
	actionCreators: {
		actionsSuccess: [accountSuccess]
	}
})
export const accountPut = makeLoader({
	defaults: {
		method: "PUT"
	},
	actionCreators: {
		actionsSuccess: [accountSuccess]
	}, 
	options: {
		showSnackbar: true, 
		mergeIntoState: true
	}
})

export default accountGet
