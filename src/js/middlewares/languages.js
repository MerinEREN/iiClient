import makeLoader from "./utilities"
import {
	languagesRequest, 
	languagesSuccess, 
	languagesFailure
} from "../actions/languages"

const URL = new URL("/languages", window.location.href)

const languagesGet = makeLoader({
	defaults: {
		URL, 
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
		URL, 
		method: "POST", 
		headers: {
			"Content-Type": "application/json", 
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
