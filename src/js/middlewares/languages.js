import {makeLoader} from "./utilities"
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
		didInvalidate: false
	}
})

export const languagePost = makeLoader({
	defaults: {
		method: "POST", 
		URL: "/languages", 
		kind: "languages"
	},
	actionCreators: {
		actionsRequest: [languagesRequest],
		actionsSuccess: [languagesSuccess],
		actionsFailure: [languagesFailure]
	}, 
	options: {
		hideFetching: true, 
		showSnackbar: true
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
		hideFetching: true, 
		showSnackbar: true
	}
})

export default languagesGet
