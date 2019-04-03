import makeLoader from "./utilities"
import {
	pagesRequest, 
	pagesSuccess, 
	pagesFailure
} from "../actions/pages"

const pageGet = makeLoader({
	defaults: {
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
export const pagePut = makeLoader({
	defaults: {
		method: "PUT", 
		headers: {
			"Accept": "application/json"
		}, 
		kind: "pages"
	},
	actionCreators: {
		actionsRequest: [pagesRequest], 
		actionsSuccess: [pagesSuccess], 
		actionsFailure: [pagesFailure]
	}
})
export const pageDelete = makeLoader({
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
		hideFetching
	}
})

export default pageGet
