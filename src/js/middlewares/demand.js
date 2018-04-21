import {makeLoader} from "./utilities"
import {
	demandSuccess
} from "../actions/demand"

const getDemand = makeLoader({
	actionCreators: {
		actionsSuccess: [demandSuccess]
	}
})
export const putDemand = makeLoader({
	defaults: {
		method: "PUT"
	},
	actionCreators: {
		actionsSuccess: [demandSuccess]
	}, 
	options: {
		showSnackbar: true, 
		mergeIntoState: true
	}
})

export default getDemand
