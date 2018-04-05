import {makeLoader} from './utilities'
import {
	contentsRequest, 
	contentsSuccess, 
	contentsFailure
} from '../actions/contents'

const getContents = makeLoader({
	defaults: {
		URL: '/contents', 
		path: ['contents']
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

export const postContents = makeLoader({
	defaults: {
		URL: '/contents', 
		method: 'POST'
	},
	actionCreators: {
		actionsSuccess: [contentsSuccess],
		actionsFailure: [contentsFailure]
	}, 
	options: {
		hideFetching: true, 
		showSnackbar: true
	}
})

export const deleteContents = makeLoader({
	defaults: {
		method: 'DELETE', 
		path: ['contents']
	},
	actionCreators: {
		actionsSuccess: [contentsSuccess],
		actionsFailure: [contentsFailure]
	}, 
	options: {
		hideFetching: true, 
		showSnackbar: true
	}
})

export default getContents
