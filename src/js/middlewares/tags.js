import {makeLoader} from "./utilities"
import {
	tagsRequest, 
	tagsSuccess, 
	tagsFailure, 
	tagsByFilterSuccess
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

export const tagsPost = makeLoader({
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

export const tagDelete = makeLoader({
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

export const tagsByFilterGet = makeLoader({
	actionCreators: {
		actionsSuccess: [tagsByFilterSuccess]
	}, 
	options: {
		hideFetching: true, 
		isCached: (state, key) => state.appState.tagsByFilter[key]
	}
})

export default tagsGet
