import makeLoader from "./utilities"
import {
	languagesRequest, 
	languagesSuccess, 
	languagesFailure
} from "../actions/languages"

const languagesGet = makeLoader({
	defaults: {
		URL: "/languages", 
		kind: "languages"
	},
	actionCreators: {
		actionsRequest: [languagesRequest],
		actionsSuccess: [languagesSuccess],
		actionsFailure: [languagesFailure]
	}, 
	options: {
		didValidate
	}
})
export const languagePost = makeLoader({
	defaults: {
		URL: "/languages", 
		method: "POST", 
		headers: {
			"Accept": "application/json"
		}
	},
	actionCreators: {
		actionsRequest: [languagesRequest],
		actionsSuccess: [languagesSuccess],
		actionsFailure: [languagesFailure]
	}
})
export const languagesDelete = makeLoader({
	defaults: {
		method: "DELETE", 
		kind: "languages"
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

export default languagesGet
