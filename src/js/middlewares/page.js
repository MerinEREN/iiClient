import {makeLoader} from "./utilities"
import {
	pageSuccess
} from "../actions/page"

const pageGet = makeLoader({
	actionCreators: {
		actionsSuccess: [pageSuccess]
	}
})
export const pagePut = makeLoader({
	defaults: {
		method: "PUT", 
		headers: {
			"Accept": "application/json"
		}
	},
	actionCreators: {
		actionsSuccess: [pageSuccess]
	}, 
	options: {
		showSnackbar: true, 
		mergeIntoState: true
	}
})

export default pageGet
