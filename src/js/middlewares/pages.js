import {makeLoader} from "./utilities"
import {
	pagesRequest, 
	pagesSuccess, 
	pagesFailure
} from "../actions/pages"

const getPages = makeLoader({
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
export const deletePages = makeLoader({
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
export const postPage = makeLoader({
	defaults: {
		method: "POST", 
		URL: "/pages", 
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

export default getPages
