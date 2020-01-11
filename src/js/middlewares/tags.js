import makeLoader, {
	isCached
} from "./utilities"
import {
	tagsRequest, 
	tagsSuccess, 
	tagsFailure
} from "../actions/tags"

/*
The reason of usage of the "isCached" instead of the "didValidate" is pagination 
at the "Tags" page.
*/
const tagsGet = makeLoader({
	defaults: {
		URL: "/tags", 
		kind: "tags"
	},
	actionCreators: {
		actionsRequest: [tagsRequest],
		actionsSuccess: [tagsSuccess],
		actionsFailure: [tagsFailure]
	}, 
	options: {
		hideFetching, 
		isCached
	}
})
export const tagPost = makeLoader({
	defaults: {
		URL: "/tags", 
		method: "POST", 
		headers: {
			"Content-Type": "application/json", 
			"Accept": "application/json"
		}
	},
	actionCreators: {
		actionsRequest: [tagsRequest],
		actionsSuccess: [tagsSuccess],
		actionsFailure: [tagsFailure]
	}
})

export default tagsGet
