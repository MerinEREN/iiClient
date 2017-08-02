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
		URL: '/languages/?action=getCount', 
		path: ["counters", "languages"]
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
		path: ["counters", "timeline"]
	}, 
	actionCreators: {
		actionsRequest: [counterTimelineRequest],
		actionsSuccess: [counterTimelineSuccess],
		actionsFailure: [counterTimelineFailure]
	},
	options: {
		hideFetching: true
	}
})

export default loadCount
