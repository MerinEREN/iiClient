import makeLoader, {
	generateURL
} from "./utilities"
import {
	counterSuccess
} from "../actions/counters"

export const URLGet = (key, link) => (dispatch, getState) => {
	switch (key) {
		case "something": 
			break
		default:
			const {
				demands: {
					[key]: {hrefs: {[link]: dURL}}
				}, 
				/* offers: {
					[key]: {hrefs: {[link]: oURL}}
				}, */
				offers: {
					[key]: oURL
				},
				servicePacks: {
					[key]: {hrefs: {[link]: spURL}}
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
