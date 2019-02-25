import {makeLoader} from "./utilities"
import {
	offerSuccess
} from "../actions/offer"

const offerGet = makeLoader({
	actionCreators: {
		actionsSuccess: [offerSuccess]
	}
})

export default offerGet
