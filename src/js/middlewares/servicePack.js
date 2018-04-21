import {makeLoader} from "./utilities"
import {
	servicePackSuccess
} from "../actions/servicePack"

const getServicePack = makeLoader({
	actionCreators: {
		actionsSuccess: [servicePackSuccess]
	}
})
export const putServicePack = makeLoader({
	defaults: {
		method: "PUT"
	},
	actionCreators: {
		actionsSuccess: [servicePackSuccess]
	}, 
	options: {
		showSnackbar: true, 
		mergeIntoState: true
	}
})

export default getServicePack
