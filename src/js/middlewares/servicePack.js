import makeLoader from "./utilities"
import {
	servicePacksRequest, 
	servicePacksSuccess, 
	servicePacksFailure
} from "../actions/servicePacks"

const servicePackGet = makeLoader({
	defaults: {
		kind: "servicePacks"
	},
	actionCreators: {
		actionsRequest: [servicePacksRequest], 
		actionsSuccess: [servicePacksSuccess], 
		actionsFailure: [servicePacksFailure]
	}, 
	options: {
		didValidate
	}
})
export const servicePackPut = makeLoader({
	defaults: {
		method: "PUT", 
		headers: {
			"Accept": "application/json"
		}, 
		kind: "servicePacks"
	},
	actionCreators: {
		actionsRequest: [servicePacksRequest], 
		actionsSuccess: [servicePacksSuccess], 
		actionsFailure: [servicePacksFailure]
	}
})
export const servicePackDelete = makeLoader({
	defaults: {
		method: "DELETE", 
		kind: "servicePacks"
	},
	actionCreators: {
		actionsRequest: [servicePacksRequest],
		actionsSuccess: [servicePacksSuccess],
		actionsFailure: [servicePacksFailure]
	}, 
	options: {
		hideFetching
	}
})

export default getServicePack
