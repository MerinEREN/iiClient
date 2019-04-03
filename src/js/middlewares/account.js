import makeLoader from "./utilities"
import {
	accountsRequest, 
	accountsSuccess, 
	accountsFailure
} from "../actions/accounts"

const accountGet = makeLoader({
	defaults: {
		kind: "accounts"
	},
	actionCreators: {
		actionsRequest: [accountsRequest], 
		actionsSuccess: [accountsSuccess], 
		actionsFailure: [accountsFailure]
	}, 
	options: {
		didValidate
	}
})
export const accountPut = makeLoader({
	defaults: {
		method: "PUT", 
		headers: {
			"Accept": "application/json"
		}, 
		kind: "accounts"
	},
	actionCreators: {
		actionsRequest: [accountsRequest], 
		actionsSuccess: [accountsSuccess], 
		actionsFailure: [accountsFailure]
	}
})

export default accountGet
