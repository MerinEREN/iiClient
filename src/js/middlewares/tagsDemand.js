import makeLoader from "./utilities"
import {
	tagsRequest, 
	tagsSuccess, 
	tagsFailure
} from "../actions/tags"

const tagsDemandGet = makeLoader({
	defaults: {
		kind: "tags"
	},
	actionCreators: {
		actionsRequest: [tagsRequest],
		actionsSuccess: [tagsSuccess],
		actionsFailure: [tagsFailure]
	}, 
	options: {
		hideFetching, 
		didValidate
	}
})
export const tagsDemandPost = makeLoader({
	defaults: {
		method: "POST", 
		kind: "tags", 
		headers: {
			"Content-Type": "application/json", 
			"Accept": "application/json"
		}
	},
	actionCreators: {
		actionsRequest: [tagsRequest],
		actionsSuccess: [tagsSuccess],
		actionsFailure: [tagsFailure]
	}, 
	options: {
		ineffective, 
		showSnackbar
	}
})

export default tagsDemandGet
