import {makeLoader} from './utilities'
import {generateUrl} from './utilities'
import {
	counterRequest, 
	counterSuccess, 
	counterFailure 
} from '../actions/counters'

export const getUrl = (domain, direction) => (dispatch, getState) => {
	const {
		dnpu, 
		onpu, 
		spnpu
	} = {
		demands: {
			timeline: {nextPageUrl}
		}, 
		offers: {
			timeline: {nextPageUrl}
		}, 
		servicePacks: {
			timeline: {nextPageUrl}
		}
	} = getState().pagination
	const url = generateUrl(domain, direction, dnpu, onpu, spnpu)
	return dispatch(counterSuccess(
		{nextPageUrl: url}, 
		Date.now(), 
		'timeline'))
}

const loadData = makeLoader({
	actionCreators: {
			actionsRequest: [counterRequest],
			actionsSuccess: [counterSuccess],
			actionsFailure: [counterFailure]
	},
	options: {
		hideFetching: true
	}
})

export default loadData
