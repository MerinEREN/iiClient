import makeLoader from "./utilities"
import {
	pagesRequest, 
	pagesSuccess, 
	pagesFailure
} from "../actions/pages"

const URL = new URL("/pages", window.location.href)

const pagesGet = makeLoader({
	defaults: {
		URL, 
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
		URL, 
		method: "POST", 
		headers: {
			"Content-Type": "application/json", 
			"Accept": "application/json"
		}
	},
	actionCreators: {
		actionsRequest: [pagesRequest],
		actionsSuccess: [pagesSuccess],
		actionsFailure: [pagesFailure]
	}
})
export const pagesDelete = makeLoader({
	defaults: {
		method: "DELETE", 
		kind: "pages"
	},
	actionCreators: {
		actionsRequest: [languagesRequest],
		actionsSuccess: [languagesSuccess],
		actionsFailure: [languagesFailure]
	}, 
	options: {
		hideFetching
	}
})

export default pagesGet
