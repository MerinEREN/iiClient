import {makeLoader} from "./utilities"
import {
	contentsRequest, 
	contentsSuccess, 
	contentsFailure
} from "../actions/contents"

const getContents = makeLoader({
	defaults: {
		URL: "/contents", 
		kind: "contents"
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
		method: "POST", 
		URL: "/contents"
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
		method: "PUT", 
		URL: "/contents", 
		kind: "contents"
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
		kind: "contents"
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

export default getContents
