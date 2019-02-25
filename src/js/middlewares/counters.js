import {
	makeLoader, 
	generateURL
} from "./utilities"
import {
	counterSuccess
} from "../actions/counters"

export const getURL = (key, paginationURL) => (dispatch, getState) => {
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

const getCount = makeLoader({
	actionCreators: {
		actionsSuccess: [counterSuccess]
	},
	options: {
		hideFetching: true
	}
})

export default getCount
