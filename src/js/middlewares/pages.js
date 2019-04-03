import makeLoader from "./utilities"
import {
	pagesRequest, 
	pagesSuccess, 
	pagesFailure
} from "../actions/pages"

const pagesGet = makeLoader({
	defaults: {
		URL: "/pages", 
		kind: "pages"
	},
	actionCreators: {
		actionsRequest: [pagesRequest],
		actionsSuccess: [pagesSuccess],
		actionsFailure: [pagesFailure]
	}, 
	options: {
		didValidate
	}
})
export const pagePost = makeLoader({
	defaults: {
		URL: "/pages", 
		method: "POST", 
		headers: {
			"Accept": "application/json"
		}
	},
	actionCreators: {
		actionsRequest: [pagesRequest],
		actionsSuccess: [pagesSuccess],
		actionsFailure: [pagesFailure]
	}
})

export default pagesGet
