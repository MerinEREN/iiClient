import makeLoader from "./utilities"
import {
	roleTypesRequest, 
	roleTypesSuccess, 
	roleTypesFailure
} from "../actions/roleTypes"

export const roleTypeDelete = makeLoader({
	defaults: {
		method: "DELETE", 
		kind: "roleTypes"
	},
	actionCreators: {
		actionsRequest: [roleTypesRequest],
		actionsSuccess: [roleTypesSuccess],
		actionsFailure: [roleTypesFailure]
	}, 
	options: {
		hideFetching
	}
})
