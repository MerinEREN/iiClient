import makeLoader from "./utilities"
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
export const offerPost = makeLoader({
	defaults: {
		method: "POST", 
		headers: {
			"Content-Type": "application/json", 
			"Accept": "application/json"
		}
	},
	actionCreators: {
		actionsRequest: [offersRequest],
		actionsSuccess: [offersSuccess],
		actionsFailure: [offersFailure]
	}
})

export default offersGet
