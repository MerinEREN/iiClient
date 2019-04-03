import makeLoader from "./utilities"
import {
	tagsRequest, 
	tagsSuccess, 
	tagsFailure
} from "../actions/tags"

const tagsDemandGet = makeLoader({
	defaults: {
		kind: "tags"
	},
	actionCreators: {
		actionsRequest: [tagsRequest],
		actionsSuccess: [tagsSuccess],
		actionsFailure: [tagsFailure]
	}, 
	options: {
		hideFetching, 
		didValidate
	}
})
/*
export const tagsDemandPost = makeLoader({
	defaults: {
		method: "POST", 
		kind: "tags"
	},
	actionCreators: {
		actionsRequest: [tagsRequest],
		actionsSuccess: [tagsSuccess],
		actionsFailure: [tagsFailure]
	}, 
	options: {
		ineffective, 
		showSnackbar
	}
})
*/

export default tagsDemandGet
