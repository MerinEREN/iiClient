import {makeLoader} from './utilities'
import {generateURL} from './utilities'
import {
	counterTimelineRequest, 
	counterTimelineSuccess, 
	counterTimelineFailure, 
	counterLanguagesRequest, 
	counterLanguagesSuccess, 
	counterLanguagesFailure 
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

export const getLanguagesCount = makeLoader({
	defaults: {
		URL: '/languages/', 
		paginationID: 'counters'
	},
	actionCreators: {
		actionsRequest: [counterLanguagesRequest],
		actionsSuccess: [counterLanguagesSuccess],
		actionsFailure: [counterLanguagesFailure]
	}, 
	options: {
		hideFetching: true
	}
})

const loadCount = makeLoader({
	defaults: {
		URL: '/timeline', 
		paginationID: 'counters'
	}, 
	actionCreators: {
		actionsRequest: [counterTimelineRequest],
		actionsSuccess: [counterTimelineSuccess],
		actionsFailure: [counterFTimelineailure]
	},
	options: {
		hideFetching: true
	}
})

export default loadCount
