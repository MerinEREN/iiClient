import {makeLoader} from "./utilities"
import {
	offerSuccess
} from "../actions/offer"

const offerGet = makeLoader({
	actionCreators: {
		actionsSuccess: [offerSuccess]
	}
})
export const offerPut = makeLoader({
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

export default offerGet
