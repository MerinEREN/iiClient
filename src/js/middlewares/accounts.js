import {makeLoader} from "./utilities"
import {
	accountsRequest, 
	accountsSuccess, 
	accountsFailure
} from "../actions/accounts"

// Get tags as args to filter result.
const getAccounts = makeLoader({
	defaults: {
		URL: "/accounts", 
		kind: "accounts"
	}, 
	actionCreators: {
		actionsRequest: [accountsRequest],
		actionsSuccess: [accountsSuccess],
		actionsFailure: [accountsFailure],
	}
	})

export default getAccounts
