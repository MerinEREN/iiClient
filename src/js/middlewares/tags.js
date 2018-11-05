import {makeLoader} from "./utilities"
import {
	tagsRequest, 
	tagsSuccess, 
	tagsFailure
} from "../actions/tags"

const tagsGet = makeLoader({
	defaults: {
		URL: "/tags", 
		kind: "tags"
	},
	actionCreators: {
		actionsRequest: [tagsRequest],
		actionsSuccess: [tagsSuccess],
		actionsFailure: [tagsFailure]
	}, 
	options: {
		didInvalidate: false
	}
})

export const tagPost = makeLoader({
	defaults: {
		URL: "/tags", 
		method: "POST", 
		headers: {
			"Accept": "application/json"
		}, 
		kind: "tags"
	},
	actionCreators: {
		actionsRequest: [tagsRequest],
		actionsSuccess: [tagsSuccess],
		actionsFailure: [tagsFailure]
	}, 
	options: {
		hideFetching: true, 
		showSnackbar: true
	}
})

export const tagsDelete = makeLoader({
	defaults: {
		method: "DELETE", 
		kind: "tags"
	},
	actionCreators: {
		actionsRequest: [tagsRequest],
		actionsSuccess: [tagsSuccess],
		actionsFailure: [tagsFailure]
	}, 
	options: {
		hideFetching: true, 
		showSnackbar: true
	}
})

export default tagsGet
