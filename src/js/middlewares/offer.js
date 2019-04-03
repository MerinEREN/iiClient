import makeLoader from "./utilities"
import {
	offersRequest, 
	offersSuccess, 
	offersFailure
} from "../actions/offers"

const offerGet = makeLoader({
	defaults: {
		kind: "offers"
	},
	actionCreators: {
		actionsRequest: [offersRequest], 
		actionsSuccess: [offersSuccess], 
		actionsFailure: [offersFailure]
	}, 
	options: {
		didValidate
	}
})
export const offerDelete = makeLoader({
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
		hideFetching
	}
})

export default offerGet
