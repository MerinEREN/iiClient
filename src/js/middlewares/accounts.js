import makeLoader from "./utilities"
import {
	accountsRequest, 
	accountsSuccess, 
	accountsFailure
} from "../actions/accounts"

const accountsGet = makeLoader({
	defaults: {
		URL: "/accounts", 
		kind: "accounts"
	}, 
	actionCreators: {
		actionsRequest: [accountsRequest],
		actionsSuccess: [accountsSuccess],
		actionsFailure: [accountsFailure]
	}
})

export default accountsGet
