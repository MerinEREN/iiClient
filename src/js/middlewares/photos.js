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
	}, 
	options: {
		didValidate
	}
})
// "showSnackbar" is to inform the users about activation after confirmation process.
export const photosPost = makeLoader({
	defaults: {
		method: "POST", 
		headers: {
			"Content-Type": "application/json"
		}
	},
	actionCreators: {
		actionsRequest: [photosRequest],
		actionsSuccess: [photosSuccess],
		actionsFailure: [photosFailure]
	}, 
	options: {
		showSnackbar
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
