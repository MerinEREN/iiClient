import {makeLoader} from "./utilities"
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
		didInvalidate: false
	}
})
export const pagesDelete = makeLoader({
	defaults: {
		method: "DELETE", 
		kind: "pages"
	},
	actionCreators: {
		actionsRequest: [pagesRequest],
		actionsSuccess: [pagesSuccess],
		actionsFailure: [pagesFailure]
	}, 
	options: {
		hideFetching: true, 
		showSnackbar: true
	}
})
export const pagePost = makeLoader({
	defaults: {
		URL: "/pages", 
		method: "POST", 
		headers: {
			"Accept": "application/json"
		}, 
		kind: "pages"
	},
	actionCreators: {
		actionsRequest: [pagesRequest],
		actionsSuccess: [pagesSuccess],
		actionsFailure: [pagesFailure]
	}, 
	options: {
		hideFetching: true, 
		showSnackbar: true
	}
})

export default pagesGet
