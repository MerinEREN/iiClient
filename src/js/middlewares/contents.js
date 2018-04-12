import {makeLoader} from "./utilities"
import {
	contentsRequest, 
	contentsSuccess, 
	contentsFailure, 
	selectedContentsReset
} from "../actions/contents"

const getContents = makeLoader({
	defaults: {
		URL: "/contents", 
		path: "contents"
	},
	actionCreators: {
		actionsRequest: [contentsRequest],
		actionsSuccess: [contentsSuccess],
		actionsFailure: [contentsFailure]
	}, 
	options: {
		didInvalidate: false
	}
})

export const postContents = makeLoader({
	defaults: {
		URL: "/contents", 
		method: "POST"
	},
	actionCreators: {
		actionsRequest: [contentsRequest],
		actionsSuccess: [contentsSuccess],
		actionsFailure: [contentsFailure]
	}, 
	options: {
		hideFetching: true, 
		showSnackbar: true
	}
})

export const putContents = makeLoader({
	defaults: {
		URL: "/contents", 
		method: "PUT", 
		path: "contents"
	},
	actionCreators: {
		actionsSuccess: [contentsSuccess],
		actionsFailure: [contentsFailure]
	}, 
	options: {
		hideFetching: true, 
		showSnackbar: true
	}
})

export const deleteContents = makeLoader({
	defaults: {
		method: "DELETE", 
		path: "contents"
	},
	actionCreators: {
		actionsRequest: [contentsRequest],
		actionsSuccess: [contentsSuccess, selectedContentsReset],
		actionsFailure: [contentsFailure]
	}, 
	options: {
		hideFetching: true, 
		showSnackbar: true
	}
})

export default getContents
