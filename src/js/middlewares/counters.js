import makeLoader, {
	generateURL
} from "./utilities"
import {
	counterSuccess
} from "../actions/counters"

// CHANGE THIS !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
export const URLGet = (key, paginationURL) => (dispatch, getState) => {
	switch (key) {
		case "something": 
			break
		default:
			const {
				demands: {
					timeline: {[paginationURL]: dURL}
				}, 
				/* offers: {
					timeline: {[paginationURL]: oURL}
				}, */
				offers: {
					timeline: oURL
				},
				servicePacks: {
					timeline: {[paginationURL]: spURL}
				}
			} = getState().pagination
			return generateURL(key, dURL, oURL, spURL)
	}
}

const countGet = makeLoader({
	actionCreators: {
		actionsSuccess: [counterSuccess]
	},
	options: {
		hideFetching
	}
})

export default countGet
