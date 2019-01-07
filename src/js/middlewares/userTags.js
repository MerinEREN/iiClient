import {makeLoader} from "./utilities"
import {
	userTagsRequest, 
	userTagsSuccess, 
	userTagsFailure
} from "../actions/userTags"

const userTagsGet = makeLoader({
	actionCreators: {
		actionsSuccess: [userTagsSuccess]
	}, 
	options: {
		hideFetching: true
	}
})
export const userTagsPost = makeLoader({
	defaults: {
		method: "POST", 
		kind: "tagsByUser"
	},
	actionCreators: {
		actionsRequest: [userTagsRequest],
		actionsSuccess: [userTagsSuccess],
		actionsFailure: [userTagsFailure]
	}, 
	options: {
		hideFetching: true, 
		showSnackbar: true
	}
})

export const userTagDelete = makeLoader({
	defaults: {
		method: "DELETE", 
		kind: "tagsByUser"
	},
	actionCreators: {
		actionsRequest: [userTagsRequest],
		actionsSuccess: [userTagsSuccess],
		actionsFailure: [userTagsFailure]
	}, 
	options: {
		hideFetching: true, 
		showSnackbar: true
	}
})

export default userTagsGet
