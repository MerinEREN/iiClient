import {makeLoader} from "./utilities"
import {
	offersRequest, 
	offersSuccess, 
	offersFailure
} from "../actions/offers"

const getOffers = makeLoader({
	defaults: {
		URL: "/offers", 
		kind: "offers"
	},
	actionCreators: {
		actionsRequest: [offersRequest],
		actionsSuccess: [offersSuccess],
		actionsFailure: [offersFailure]
	}
})
export const deleteOffers = makeLoader({
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
export const postOffer = makeLoader({
	defaults: {
		method: "POST", 
		URL: "/offers", 
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

export default getOffers
