import {makeLoader} from './utilities'
import {
	pagesRequest, 
	pagesSuccess, 
	pagesFailure
} from '../actions/pages'
import {
	pageSuccess, 
	pageFailure
} from '../actions/page'

const getPage = makeLoader({
	actionCreators: {
		actionsSuccess: [pageSuccess]
	}, 
	options: {
		hideFetching: true
	}
})
export const deletePage = makeLoader({
	defaults: {
		method: 'DELETE', 
		path: ['pages']
	},
	actionCreators: {
		actionsSuccess: [pagesSuccess],
		actionsFailure: [pagesFailure]
	}, 
	options: {
		hideFetching: true, 
		showSnackbar: true
	}
})
export const putPage = makeLoader({
	defaults: {
		method: 'PUT', 
	},
	actionCreators: {
		actionsSuccess: [pageSuccess],
		actionsFailure: [pageFailure]
	}, 
	options: {
		hideFetching: true, 
		showSnackbar: true
	}
})

export default getPage
