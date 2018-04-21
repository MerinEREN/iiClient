import {makeLoader} from "./utilities"
import {
	offerSuccess
} from "../actions/offer"

const getOffer = makeLoader({
	actionCreators: {
		actionsSuccess: [offerSuccess]
	}
})
export const putOffer = makeLoader({
	defaults: {
		method: "PUT"
	},
	actionCreators: {
		actionsSuccess: [offerSuccess]
	}, 
	options: {
		showSnackbar: true, 
		mergeIntoState: true
	}
})

export default getOffer
