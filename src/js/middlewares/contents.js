import {makeLoader} from './utilities'
import {
	contentsRequest, 
	contentsSuccess, 
	contentsFailure
} from '../actions/contents'

export const postContents = makeLoader({
	defaults: {
		URL: '/contents/', 
		method: 'POST'
	},
	actionCreators: {
		actionsSuccess: [contentsSuccess],
		actionsFailure: [contentsFailure]
	}, 
	options: {
		// hideFetching: true, 
		showSnackbar: true
	}
})

const getContents = makeLoader({
	defaults: {
		URL: '/contents/', 
		path: ['contentsByPage']
	},
	actionCreators: {
		actionsRequest: [contentsRequest],
		actionsSuccess: [contentsSuccess],
		actionsFailure: [contentsFailure]
	}, 
	options: {
		didInvalidate: false
	}
})

export default getContents
