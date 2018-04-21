import {makeLoader} from "./utilities"
import {
	servicePacksRequest, 
	servicePacksSuccess, 
	servicePacksFailure
} from "../actions/servicePacks"

const getServicePacks = makeLoader({
	defaults: {
		URL: "/servicePacks", 
		kind: "servicePacks" 
	},
	actionCreators: {
		actionsRequest: [servicePacksRequest],
		actionsSuccess: [servicePacksSuccess],
		actionsFailure: [servicePacksFailure]
	}
})
export const deleteServicePacks = makeLoader({
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
		hideFetching: true, 
		showSnackbar: true
	}
})
export const postServicePack = makeLoader({
	defaults: {
		method: "POST", 
		URL: "/servicePacks", 
		kind: "servicePacks"
	},
	actionCreators: {
		actionsRequest: [servicePacksRequest],
		actionsSuccess: [servicePacksSuccess],
		actionsFailure: [servicePacksFailure]
	}, 
	options: {
		hideFetching: true, 
		showSnackbar: true
	}
})

export default getServicePacks
