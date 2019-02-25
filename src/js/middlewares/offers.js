import {makeLoader} from "./utilities"
import {
	offersRequest, 
	offersSuccess, 
	offersFailure
} from "../actions/offers"

const offersGet = makeLoader({
	defaults: {
		kind: "offers"
	},
	actionCreators: {
		actionsRequest: [offersRequest],
		actionsSuccess: [offersSuccess],
		actionsFailure: [offersFailure]
	}
})
export const offersDelete = makeLoader({
	defaults: {
		method: "DELETE", 
		kind: "offers"
	},
	actionCreators: {
		actionsRequest: [offersRequest],
		actionsSuccess: [offersSuccess],
		actionsFailure: [offersFailure]
	}, 
	options: {
		hideFetching: true, 
		showSnackbar: true
	}
})
export const offerPost = makeLoader({
	defaults: {
		method: "POST"
	},
	options: {
		hideFetching: true, 
		showSnackbar: true
	}
})

export default offersGet
