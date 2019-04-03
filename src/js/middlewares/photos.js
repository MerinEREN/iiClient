import makeLoader from "./utilities"
import {
	photosRequest, 
	photosSuccess, 
	photosFailure
} from "../actions/photos"

const photosGet = makeLoader({
	defaults: {
		URL: "/photos", 
		kind: "photos"
	},
	actionCreators: {
		actionsRequest: [photosRequest],
		actionsSuccess: [photosSuccess],
		actionsFailure: [photosFailure]
	}, 
	options: {
		didValidate
	}
})
export const photosPost = makeLoader({
	defaults: {
		URL: "/photos", 
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
