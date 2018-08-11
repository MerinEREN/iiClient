import {makeLoader} from "./utilities"
import {generateURL} from "./utilities"
import {
	counterSuccess
} from "../actions/counters"

export const getURL = (key, returnedURL) => (dispatch, getState) => {
	switch (key) {
		case "something": 
			break
		default:
			const {
				demands: {
					timeline: {[returnedURL]: dURL}
				}, 
				offers: {
					timeline: {[returnedURL]: oURL}
				}, 
				servicePacks: {
					timeline: {[returnedURL]: spURL}
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
