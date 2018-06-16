import {makeLoader} from "./utilities"
import {
	tagsRequest, 
	tagsSuccess, 
	tagsFailure
} from "../actions/tags"

const getTags = makeLoader({
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

export const postTag = makeLoader({
	defaults: {
		method: "POST", 
		URL: "/tags", 
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

export const deleteTags = makeLoader({
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

export default getTags
