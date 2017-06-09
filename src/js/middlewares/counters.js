import {makeLoader} from './utilities'
import {generateURL} from './utilities'
import {
	counterRequest, 
	counterSuccess, 
	counterFailure 
} from '../actions/counters'

export const getURL = (groupID, returnedURL) => (dispatch, getState) => {
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
	return generateURL(groupID, returnedURL, dURL, oURL, spURL)
}

const loadCount = makeLoader({
	defaults: {
		URL: '/timeline', 
		paginationID: 'counters'
	}, 
	actionCreators: {
		actionsRequest: [counterRequest],
		actionsSuccess: [counterSuccess],
		actionsFailure: [counterFailure]
	},
	options: {
		hideFetching: true
	}
})

export default loadCount
