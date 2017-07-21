import {makeLoader} from './utilities'
import {
	contentsRequest, 
	contentsSuccess, 
	contentsFailure
} from '../actions/contents'

export const postContents = makeLoader({
	defaults: {
		URL: '/contents/', 
		method: 'POST', 
		paginationID: 'contents'
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
		paginationID: 'contents'
	},
	actionCreators: {
		actionsRequest: [contentsRequest],
		actionsSuccess: [contentsSuccess],
		actionsFailure: [contentsFailure]
	}
})

export default getContents
