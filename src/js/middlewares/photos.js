import makeLoader from "./utilities"
import {
	photosRequest, 
	photosSuccess, 
	photosFailure
} from "../actions/photos"

const photosGet = makeLoader({
	defaults: {
		kind: "photos"
	},
	actionCreators: {
		actionsRequest: [photosRequest],
		actionsSuccess: [photosSuccess],
		actionsFailure: [photosFailure]
	}
})
export const photosPost = makeLoader({
	defaults: {
		method: "POST", 
		headers: {
			"Accept": "application/json"
		}
	},
	actionCreators: {
		actionsRequest: [photosRequest],
		actionsSuccess: [photosSuccess],
		actionsFailure: [photosFailure]
	}
})
export const photosDelete = makeLoader({
	defaults: {
		method: "DELETE", 
		kind: "photos"
	},
	actionCreators: {
		actionsRequest: [photosRequest],
		actionsSuccess: [photosSuccess],
		actionsFailure: [photosFailure]
	}, 
	options: {
		hideFetching
	}
})

export default photosGet
