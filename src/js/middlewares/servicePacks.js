import {makeLoader} from "./utilities"
import {
	servicePacksRequest, 
	servicePacksSuccess, 
	servicePacksFailure
} from "../actions/servicePacks"

const servicePacksGet = makeLoader({
	defaults: {
		kind: "servicePacks" 
	},
	actionCreators: {
		actionsRequest: [servicePacksRequest],
		actionsSuccess: [servicePacksSuccess],
		actionsFailure: [servicePacksFailure]
	}
})

export default servicePacksGet
