import {makeLoader} from "./utilities"
import {
	pageSuccess
} from "../actions/page"

const getPage = makeLoader({
	actionCreators: {
		actionsSuccess: [pageSuccess]
	}
})
export const putPage = makeLoader({
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

export default getPage
